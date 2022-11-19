
map_data_url = 'http://tsp.myvnc.com/map_data/'
vote_data_url = 'http://tsp.myvnc.com/vote_data/'

select_vote_type = document.getElementById("get_vote_type");
get_vote_type_list()       //取得 vote_type 清單塞進 get_vote_type
get_vote_type_name = encodeURIComponent(get_vote_type.value);

select_city = document.getElementById("get_city");
get_city_list()       //取得 city 清單塞進 get_city
get_city_name = encodeURIComponent(get_city.value);

select_vote_place = document.getElementById("get_vote_place");
get_vote_place_list() //取得 vote_place 清單塞進 get_vote_place
get_vote_place_name = encodeURIComponent(get_vote_place.value);

select_district = document.getElementById("get_district");
get_district_list()   //取得 district 清單塞進 get_district
get_district_name = encodeURIComponent(get_district.value)

get_vote_map_data()   //取得vote_data & town_map_data & 座標
geojson = L.geoJSON(town_map_data)
const map = L.map("myMap", {  // 設定地圖中心點與放大倍率
  center: [22.640447, 120.302542],
  zoom: 13
});
lay = L.geoJSON(town_map_data, { onEachFeature: onEachFeature }).addTo(map);
select_vote_type.addEventListener("change", function (e) {	//get_vote_type的下拉選單有變化時
  get_vote_map_data()
  get_city_list()
  get_district_list()
  reset_map_center(map, [coordinate_x, coordinate_y])
  geojson = L.geoJSON(town_map_data)
  lay.clearLayers();
  lay = L.geoJSON(town_map_data, { onEachFeature: onEachFeature }).addTo(map);
  update_Pie(e)
});
select_city.addEventListener("change", function (e) {	//get_city的下拉選單有變化時
  get_vote_place_list()
  get_district_list()
  get_vote_map_data()
  reset_map_center(map, [coordinate_x, coordinate_y])
  geojson = L.geoJSON(town_map_data)
  lay.clearLayers();
  lay = L.geoJSON(town_map_data, { onEachFeature: onEachFeature }).addTo(map);
  update_Pie(e)
})
select_vote_place.addEventListener("change", function (e) {	//get_vote_place的下拉選單有變化時
  get_district_list()
  get_vote_map_data()
  reset_map_center(map, [coordinate_x, coordinate_y])
  geojson = L.geoJSON(town_map_data)
  lay.clearLayers();
  lay = L.geoJSON(town_map_data, { onEachFeature: onEachFeature }).addTo(map);
  update_Pie(e)
})
select_district.addEventListener("change", function (e) {	//get_district的下拉選單有變化時
  get_vote_map_data()
  reset_map_center(map, [coordinate_x, coordinate_y])
  geojson = L.geoJSON(town_map_data)
  lay.clearLayers();
  lay = L.geoJSON(town_map_data, { onEachFeature: onEachFeature }).addTo(map);
})

function get_vote_map_data() {
  get_vote_type_name = encodeURIComponent(get_vote_type.value);
  get_city_name = encodeURIComponent(get_city.value);
  get_vote_place_name = encodeURIComponent(get_vote_place.value);
  get_district_name = encodeURIComponent(get_district.value)
  vote_data = JSON.parse(get_subcount(vote_data_url + get_vote_type_name + '/' + get_city_name + '/' + get_vote_place_name + '/' + get_district_name))

  town_map_data = JSON.parse(get_subcount(map_data_url + get_city_name + '/' + get_district_name))
  coordinate_x = town_map_data['features'][0]['geometry']['coordinates'][0][0][1]
  coordinate_y = town_map_data['features'][0]['geometry']['coordinates'][0][0][0]
}
function get_vote_type_list() {
  document.getElementById('get_vote_type').innerText = null;	//清空下拉選單
  vote_type_list = [...new Set(JSON.parse(get_subcount('http://tsp.myvnc.com/vote_types'))['data'])]
  for (var i = 0; i < vote_type_list.length; i++) {	      //把選舉種類塞入vote_type的下拉選單中
    var opt = vote_type_list[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select_vote_type.appendChild(el);
  }
}
function get_city_list() {
  document.getElementById('get_city').innerText = null;	//清空下拉選單
  city_list = [...new Set(JSON.parse(get_subcount(vote_data_url + get_vote_type_name))['data'])]
  for (var i = 0; i < city_list.length; i++) {	      //把縣市名單塞入get_city的下拉選單中
    var opt = city_list[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select_city.appendChild(el);
  }
}
function get_vote_place_list() {
  get_vote_type_name = encodeURIComponent(get_vote_type.value);
  get_city_name = encodeURIComponent(get_city.value);
  document.getElementById('get_vote_place').innerText = null;	//清空下拉選單
  vote_place_list = [...new Set(JSON.parse(get_subcount(vote_data_url + get_vote_type_name + '/' + get_city_name))['data'])]
  vote_place_list.sort();
  for (var i = 0; i < vote_place_list.length; i++) {	//把01選區~10選區名單塞入get_vote_place的下拉選單中
    var opt = vote_place_list[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select_vote_place.appendChild(el);
  }
}
function get_district_list() {
  var get_vote_type_name = encodeURIComponent(get_vote_type.value);
  var get_city_name = encodeURIComponent(get_city.value);
  var get_vote_place_name = encodeURIComponent(get_vote_place.value);
  district_in_place = JSON.parse(get_subcount(vote_data_url + get_vote_type_name + '/' + get_city_name + '/' + get_vote_place_name))['data'][0].split(',')
  document.getElementById('get_district').innerText = null;	//清空下拉選單
  for (var i = 0; i < district_in_place.length; i++) {	//把行政選區名單塞入get_district的下拉選單中
    var opt = district_in_place[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select_district.appendChild(el);
  }

}
function get_subcount(url) {	//get data using jquery.ajax
  var subcount;
  $.ajax({
    url: url,
    datatype: 'json',
    async: false,
    success: function (data) {
      subcount = data;
    }
  });
  return subcount
}
function reset_map_center(map, point) {
  map.setView(point, 13, { animation: true })
}
function getColor(d) {
  return d > 1000 ? '#800026' :
    d > 500 ? '#BD0026' :
      d > 200 ? '#E31A1C' :
        d > 100 ? '#FC4E2A' :
          d > 50 ? '#FD8D3C' :
            d > 20 ? '#FEB24C' :
              d > 10 ? '#FED976' :
                '#D2E9FF';
}
function style(feature) {
  return {
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: 'black',
    dashArray: '3',
    fillOpacity: 0.7
  };
}
function highlightFeature(e, feature) {
  var layer = e.target;
  layer.setStyle({
    weight: 5,
    color: '#678',
    dashArray: '',
    fillOpacity: 0.7
  });
  var VILLNAME = layer.feature.properties.VILLNAME
  layer.bindTooltip(VILLNAME).openTooltip();
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}
function zoomToFeature(e) {
  //map.fitBounds(e.target.getBounds());
  var layer = e.target;
  var TOWNNAME = layer.feature.properties.TOWNNAME
  var VILLNAME = layer.feature.properties.VILLNAME
  console.log(TOWNNAME + VILLNAME)
  vill_index = getKeyByValue(vote_data['village_name'], TOWNNAME + VILLNAME);
  console.log(vill_index);
  console.log("in zoomToFeature");
  console.log(vote_data);
  var color_list = []
  var candidate_data = []
  var candidate_name = []
  var random_green = ['#006000', '#007500', '#009100', '#00A600', '#00BB00', '#00DB00', '#00EC00', '#28FF28', '#53FF53',
    '#79FF79', '#006030', '#01814A', '#019858', '#01B468', '#02C874', '#02DF82', '#02F78E', '#1AFD9C']
  var random_blue = ['#003060', '#003D79', '#004B97', '#005AB5', '#0066CC', '#0072E3', '#0080FF', '#2894FF', '#46A3FF',
    '#000079', '#000093', '#0000C6', '#0000C6', '#0000E3', '#2828FF', '#4A4AFF', '#6A6AFF', '#7D7DFF']
  var random_yellow = ['#FFD306', '#FFDC35', '#FFE153', '#FFE66F']
  var random_TMD = ['#00E3E3', '#00FFFF', '#4DFFFF', '#80FFFF', '#A6FFFF']
  var random_no_party = ['#4F4F4F', '#5B5B5B', '#6C6C6C', '#7B7B7B', '#8E8E8E', '#9D9D9D', '#ADADAD', '#BEBEBE', '#D0D0D0']
  candidate_data_length = Object.keys(vote_data).length - 8
  for (var i = 1; i < candidate_data_length; i++) {
    if (vote_data[i][1] == '民主進步黨') {
      color_list.push(random_green[0])
      random_green.shift()
    } else if (vote_data[i][1] == "中國國民黨") {
      color_list.push(random_blue[0])
      random_blue.shift()
    } else if (vote_data[i][1] == "時代力量") {
      color_list.push(random_yellow[0])
      random_yellow.shift()
    } else if (vote_data[i][1] == '台灣民眾黨') {
      color_list.push(random_TMD[0])
      random_TMD.shift()
    } else if (vote_data[i][1] == '基進黨' || vote_data[i][1] == '台灣基進') {
      color_list.push('#600000')
    } else {
      color_list.push(random_no_party[0])
      random_no_party.shift()
    }
    candidate_data.push(vote_data[i][vill_index])
    candidate_name.push(vote_data[i][0])
  }
  console.log(candidate_data)
  console.log(candidate_name)


  window.myPie.config.data.datasets.forEach(function (e) {
    e.data = candidate_data,
      e.backgroundColor = color_list
  });
  window.myPie.config.data.labels.forEach(function (e) {
    e.labels = candidate_name
  });
  window.myPie.update();
}
function resetHighlight(e) {
  geojson.resetStyle(e.target);
}
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}
function getKeyByValue(object, value) {
  for (var prop in object) {
    if (object.hasOwnProperty(prop)) {
      if (object[prop] === value)
        return prop;
    }
  }
}
function update_Pie(e) {
  window.myPie.destroy();
  var color_list = []
  var candidate_data = []
  var candidate_name = []
  var random_green = ['#006000', '#007500', '#009100', '#00A600', '#00BB00', '#00DB00', '#00EC00', '#28FF28', '#53FF53',
    '#79FF79', '#006030', '#01814A', '#019858', '#01B468', '#02C874', '#02DF82', '#02F78E', '#1AFD9C']
  var random_blue = ['#003060', '#003D79', '#004B97', '#005AB5', '#0066CC', '#0072E3', '#0080FF', '#2894FF', '#46A3FF',
    '#000079', '#000093', '#0000C6', '#0000C6', '#0000E3', '#2828FF', '#4A4AFF', '#6A6AFF', '#7D7DFF']
  var random_yellow = ['#FFD306', '#FFDC35', '#FFE153', '#FFE66F']
  var random_TMD = ['#00E3E3', '#00FFFF', '#4DFFFF', '#80FFFF', '#A6FFFF']
  var random_no_party = ['#4F4F4F', '#5B5B5B', '#6C6C6C', '#7B7B7B', '#8E8E8E', '#9D9D9D', '#ADADAD', '#BEBEBE', '#D0D0D0']
  candidate_data_length = Object.keys(vote_data).length - 8
  console.log(vote_data)
  for (var i = 1; i < candidate_data_length; i++) {
    if (vote_data[i][1] == '民主進步黨') {
      color_list.push(random_green[0])
      random_green.shift()
    } else if (vote_data[i][1] == "中國國民黨") {
      color_list.push(random_blue[0])
      random_blue.shift()
    } else if (vote_data[i][1] == "時代力量") {
      color_list.push(random_yellow[0])
      random_yellow.shift()
    } else if (vote_data[i][1] == '台灣民眾黨') {
      color_list.push(random_TMD[0])
      random_TMD.shift()
    } else if (vote_data[i][1] == '基進黨' || vote_data[i][1] == '台灣基進') {
      color_list.push('#600000')
    } else {
      color_list.push(random_no_party[0])
      random_no_party.shift()
    }
    candidate_data.push(vote_data[i][2])
    candidate_name.push(vote_data[i][0])
  }
  console.log(candidate_data)
  console.log(candidate_name)
  var config = {
    type: 'pie',
    data: {
      datasets: [{
        data: candidate_data,
        backgroundColor: color_list,
        label: 'Dataset 2'
      }],
      labels: candidate_name
      ,
      options: {
        responsive: true
      }
    }
  };
  var ctx = document.getElementById('chart-area');//.getContext('2d');
  window.myPie = new Chart(ctx, config);
}

fetch('http://tsp.myvnc.com/objects') // 取得 icon 資料
  .then(function (response) {
    res_data = response.json()
    return res_data;
  })
  .then(function (res_data) {
    console.log(res_data);
    res_data['data'].forEach(item => {  // 創建 icon
      const Icon = new L.Icon({
        iconUrl: item.icon_url,
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      // 添加標記點
      L.marker(item.local, {
        title: item.name,
        icon: Icon
      })
        .addTo(map)
        .bindPopup(item.name);
    })
  })
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { // 載入圖資
  attribution:
    '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>         contributors'
}).addTo(map);

// initialize ChartJs : myPie 
var color_list = []
var candidate_data = []
var candidate_name = []
var random_green = ['#006000', '#007500', '#009100', '#00A600', '#00BB00', '#00DB00', '#00EC00', '#28FF28', '#53FF53',
  '#79FF79', '#006030', '#01814A', '#019858', '#01B468', '#02C874', '#02DF82', '#02F78E', '#1AFD9C']
var random_blue = ['#003060', '#003D79', '#004B97', '#005AB5', '#0066CC', '#0072E3', '#0080FF', '#2894FF', '#46A3FF',
  '#000079', '#000093', '#0000C6', '#0000C6', '#0000E3', '#2828FF', '#4A4AFF', '#6A6AFF', '#7D7DFF']
var random_yellow = ['#FFD306', '#FFDC35', '#FFE153', '#FFE66F']
var random_TMD = ['#00E3E3', '#00FFFF', '#4DFFFF', '#80FFFF', '#A6FFFF']
var random_no_party = ['#4F4F4F', '#5B5B5B', '#6C6C6C', '#7B7B7B', '#8E8E8E', '#9D9D9D', '#ADADAD', '#BEBEBE', '#D0D0D0']
console.log(vote_data)
candidate_data_length = Object.keys(vote_data).length - 8
for (var i = 1; i < candidate_data_length; i++) {
  if (vote_data[i][1] == '民主進步黨') {
    color_list.push(random_green[0])
    random_green.shift()
  } else if (vote_data[i][1] == "中國國民黨") {
    color_list.push(random_blue[0])
    random_blue.shift()
  } else if (vote_data[i][1] == '時代力量') {
    color_list.push(random_yellow[0])
    random_yellow.shift()
  } else if (vote_data[i][1] == '台灣民眾黨') {
    color_list.push(random_TMD[0])
    random_TMD.shift()
  } else if (vote_data[i][1] == '基進黨' || vote_data[i][1] == '台灣基進') {
    color_list.push('#600000')
  } else {
    color_list.push(random_no_party[0])
    random_no_party.shift()
  }
  candidate_data.push(vote_data[i][2])
  candidate_name.push(vote_data[i][0])
}

var config = {
  type: 'pie',
  data: {
    datasets: [{
      data: candidate_data,
      backgroundColor: color_list,
      label: 'Dataset 2'
    }],
    labels: candidate_name
    ,
    options: {
      responsive: true
    }
  }
};
const dataset = {
  labels: ['test', 'qwe'],
  datasets: [
    {
      label: 'Dataset 1',
      data: 10,
      borderColor: '#00E3E3'
    },
    {
      label: 'Dataset 2',
      data: 20,
      borderColor: '#003060'
    }
  ]
};
const config2 = {
  type: 'bar',
  data: dataset,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart'
      }
    }
  },
};
window.onload = function () {
  var bar_ctx = document.getElementById('Bar_Chart');//.getContext('2d');
  window.myBar = new Chart(bar_ctx, config2);
}
window.onload = function () {
  var ctx = document.getElementById('chart-area');//.getContext('2d');
  window.myPie = new Chart(ctx, config);
};