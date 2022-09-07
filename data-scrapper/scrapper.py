import requests, json
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime, timedelta


def lambda_handler():
    overall_output_1 = {}
    overall_output_1['cryptoslam'] = []
    overall_output_1['immutascan'] = []
    
    url = "http://cryptoslam.io/"
    headers = {'Content-Type': 'application/json'}
    response = requests.request("GET", url, headers=headers, data={})
    soup = BeautifulSoup(response.content, 'html.parser')
    
    table = soup.find_all('table')
    table_holder = {}
    for i,table_ in enumerate(table):
      table_holder[i] = pd.read_html(str(table_))
    
    ## Portion - 1
    def df_cleaner(df):
      return df.loc[:, ~df.columns.str.contains('^Unnamed')]
    
    def mapper_11(data):
      return {'Blockchain' : data['Blockchain'].split(' ')[0],
              'Sales' : int("".join(e for e in data['Sales'] if e.isalnum())),
              'Change (24h)' : data['Change (24h)'],
              'Buyers' : data['Buyers'],
              'Txns' : data['Txns']
              }
    
    def flow_1_site_1(table_holder):
      result = df_cleaner(table_holder[2][0]).to_json(orient='records')
      parsed = json.loads(result)
    
      for item in parsed:
        if item['Blockchain'] == "ImmutableX ImmutableX":
          return mapper_11(item)
        
    def mapper_12(current_day_data, yesterday_data, output_1):
      return {'Blockchain' : 'ImmutableX', 
              'Sales' : current_day_data['trade_volume_usd'], 
              'Change (24h)' : output_1['Change (24h)'],
              'Buyers' : current_day_data['owner_count'],
              'Txns' : current_day_data['trade_count']
              } 
    
    def flow_1_site_2(output_1):
      url = "https://3vkyshzozjep5ciwsh2fvgdxwy.appsync-api.us-west-2.amazonaws.com/graphql"
    
      payload="{\"query\":\"query getMetricsAll($address: String!) {\\n  getMetricsAll(address: $address) {\\n    items {\\n      type\\n      trade_volume_usd\\n      trade_volume_eth\\n      floor_price_usd\\n      floor_price_eth\\n      trade_count\\n      owner_count\\n      __typename\\n    }\\n    __typename\\n  }\\n}\",\"variables\":{\"address\":\"global\"}}"
      headers = {'x-api-key': 'da2-ihd6lsinwbdb3e6c6ocfkab2nm', 'Content-Type': 'application/json'}
      response = requests.request("POST", url, headers=headers, data=payload).json()['data']['getMetricsAll']["items"]
    
      current_day_data, yesterday_data = None, None
      for item in response:
        if item['type'] == str(datetime.today().date()):
          current_day_data = item
        elif item['type'] == str((datetime.now() - timedelta(days=1)).date()):
          yesterday_data = item
      return mapper_12(current_day_data, yesterday_data, output_1)
    
    output_1 =  flow_1_site_1(table_holder)
    output_2 = flow_1_site_2(output_1)
    
    overall_output_1['cryptoslam'].append(output_1)
    overall_output_1['immutascan'].append(output_2)
    
    ## Portion - 2
    df2 = df_cleaner(table_holder[2][0])
    def name_cleaner(row):
      return row['Blockchain'].split(' ')[0]
    
    df2['Blockchain'] = df2.apply(name_cleaner, axis = 1)
    df2 = eval(df2.to_json(orient="records"))
    
    ## Portion - 3
    def flow_3_site_1():
      url = "https://3vkyshzozjep5ciwsh2fvgdxwy.appsync-api.us-west-2.amazonaws.com/graphql"
      payload="{\"query\":\"query getMetricsAll($address: String!, $limit: Int) {\\n  getMetricsAll(address: $address, limit: $limit, sort_asc: true) {\\n    items {\\n      type\\n      collection_address\\n      last_7_usd\\n      last_7_eth\\n      last_7_count\\n      last_30_usd\\n      last_30_eth\\n      last_30_count\\n      last_90_usd\\n      last_90_eth\\n      last_90_count\\n      all_time_usd\\n      all_time_eth\\n      all_time_count\\n    }\\n  }\\n}\",\"variables\":{\"address\":\"last_7_usd\",\"limit\":10}}"
      headers = {'x-api-key': 'da2-ihd6lsinwbdb3e6c6ocfkab2nm', 'Content-Type': 'application/json'}
      response = requests.request("POST", url, headers=headers, data=payload).json()
      return response
    
    def flow_3_site_2():
      url = "https://immutascan.io/assets/tokens.json"
      response = requests.request("GET", url, headers={}, data={}).json()
      return response
    
    def flow_3_site_3(address):
      url = "https://3vkyshzozjep5ciwsh2fvgdxwy.appsync-api.us-west-2.amazonaws.com/graphql"
      payload= "{\"query\":\"query getMetrics($address: String!) {\\n  getMetrics(address: $address, type: \\\"total\\\") {\\n    trade_count\\n    owner_count\\n    transaction_count\\n    trade_proceeds_usd\\n    trade_proceeds_eth\\n    trade_spend_usd\\n    trade_spend_eth\\n    trade_volume_usd\\n    trade_volume_eth\\n    mint_token_count\\n    floor_price_usd\\n    floor_price_eth\\n    __typename\\n  }\\n}\",\"variables\":{\"address\":\"{}\".format(address)}}"
      payload_ = eval(payload)
      payload_['variables']['address'] = address
      headers = {'x-api-key': 'da2-ihd6lsinwbdb3e6c6ocfkab2nm','Content-Type': 'application/json'}
      response = requests.request("POST", url, headers=headers, data=json.dumps(payload_))
      return response.json()
    
    def mapper_33(data):
      holder = flow_3_site_2()
      mapper = {}
      for item in holder:
        mapper[item['token_address']] = {'name' : item['name'], 'image_url' : item['image_url']}
    
      for item in data['data']['getMetricsAll']['items']:
        item.update({'name' : mapper[item['collection_address']]['name']})
        item.update({'image_url' : mapper[item['collection_address']]['image_url']})
        item.update(flow_3_site_3(item['collection_address'])['data']['getMetrics'])
      return data
    
    response = mapper_33(flow_3_site_1())
    return {
        'statusCode': 200,
        'body' : json.dumps({"overall_output_1" : overall_output_1,
                             "overall_output_2" : df2,
                             "overall_output_3" : response}
                             )
    }

if __name__ == "__main__":
  print(lambda_handler())