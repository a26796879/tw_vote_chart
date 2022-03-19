import json
import pandas as pd
import os

def all_towntup_geo_data():
    #建立各鄉鎮區，自己的map_data
    file = open('map_data/Tw_map_data.json')
    data = json.load(file)

    town_list = []
    for i in range(len(data['features'])):
        county_name = data['features'][i]['properties']['COUNTYNAME']
        town_name = data['features'][i]['properties']['TOWNNAME']
        town_list.append(county_name+town_name)
    #town_list
    all_town = set(town_list)

    for town in all_town:
        features = []
        json_obj = {"type":"FeatureCollection", "features":features}
        
        for i in range(len(data['features'])):
            county_name = data['features'][i]['properties']['COUNTYNAME']
            town_name = data['features'][i]['properties']['TOWNNAME']

            if county_name+town_name == town:
                features.append(data['features'][i])
                data['features'][i].pop
        with open('map_data/'+town + '.js', 'w') as f:
            f.write("\nvar town_map_data=" + json.dumps(json_obj))
    return True

def all_towntup_vote_data():
    dirs = os.listdir('vote_datasets/107年直轄市議員/')
    print(dirs)
    for file_name in dirs:
        if '.xls' in file_name:
            city = file_name.split('(')[1].replace(').xls','')
            if city != file_name:
                try:
                    os.mkdir(f'vote_datasets/107年直轄市議員/{city}')
                except:
                    pass
            
        xl = pd.ExcelFile(f'vote_datasets/107年直轄市議員/{file_name}')
        for sheet_name in xl.sheet_names:   #歷遍每個sheet
            df = xl.parse(sheet_name)
            colNameList = df.columns.tolist()   #取得title
            df.iloc[4,0] = df.iloc[4,0].split('\u3000')[1]
            candidate_col = len(df.columns)-8
            count_row = df.shape[0]

            change_name = {colNameList[0]:'village_name',colNameList[1]:'村里別',colNameList[2]:'投開票所別'}
            for i in range(3,candidate_col):
                voter = df.iloc[1, i].split('\n')
                df.iloc[0, i] = voter[0]
                df.iloc[1, i] = voter[1]
                df.iloc[2, i] = voter[2]
                change_name['Unnamed: '+str(i)] = i-2
            for i in range(candidate_col,len(df.columns)):
                voter = df.iloc[0, i].split('\n')
                df.iloc[0, i] = voter[1]
                df.iloc[1, i] = voter[3]
                change_name['Unnamed: '+str(i)] = df.iloc[0, i]
            df.iloc[1, 0] = " 候選人"
            df.iloc[2, 0] = " 所屬黨派"
            df = df.rename(change_name, axis=1)

            df = df.fillna('')
            for i in range(5,count_row):
                if df.iloc[i, 0] == '　　':
                    df.iloc[i, 0] = df.iloc[i-1, 0]
            for i in range(5,count_row):
                df.iloc[i, 0] = df.iloc[i, 0].replace("　","") + df.iloc[i, 1]

            df2 = df.groupby(['village_name'], as_index=False).sum()
            df2 = df2.drop(columns=['村里別','投開票所別'])
            df2 = df2.drop([0])
            row_data_df = df2.set_index('village_name')
            row_data_df.reset_index(inplace=True)
            
            with open(f'vote_datasets/107年直轄市議員/{city}/{sheet_name}.js', 'w') as f:
                f.write('var vote_data='+ row_data_df.to_json())

if __name__ == '__main__':
    #all_towntup_geo_data()
    all_towntup_vote_data()