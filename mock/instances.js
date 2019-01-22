
import mockjs from 'mockjs';

const instancesList = mockjs.mock({
  code:0,
  'info|100': [
    { 
      'id|+1':1001,
      company: '@word(8, 12)', 
      country: '@county', 
      sub_domain: '@domain', 
      custom_domain: '@domain', 
      register_email: '@email', 
      register_name: '@name', 
      register_position: '@county(true)', 
      registed_at: '@datetime', 
      "status|1-6":1, 
      "clicks|200-10000":3221, 
      "conversions|100-8000":3012, 
      "spend|10-10000.1-2":3012.12, 
      "earnings|10-10000.1-2":3012.12, 
      "profit|10-10000.1-2":3012.12, 
      roi:'@float(0, 0, 2, 2)', 
    }
  ],
  total:100,
  page:1,
  page_size:20
});


const suppliesList = mockjs.mock({
  code:0,
  'info|100': [
    { 
      'aff_id|+1':1001,
      name:'@name',
      company: '@word(8, 12)', 
      bd: '@name', 
      am: '@name', 
      "status|1-2":1, 
      "clicks|200-10000":3221, 
      "conversions|100-8000":3012, 
      cr:'@float(0, 0, 2, 2)', 
      epc:'@float(0, 0, 2, 2)', 
      "spend|10-10000.1-2":3012.12, 
      "earnings|10-10000.1-2":3012.12, 
      "profit|10-10000.1-2":3012.12, 
      roi:'@float(0, 0, 2, 2)', 
    }
  ],
  total:100,
  page:1,
  page_size:20
});

const demandsList = mockjs.mock({
  code:0,
  'info|100': [
    { 
      'code|+1':1001,
      "demand_type|1-2":1, 
      name:'@name',
      company: '@word(8, 12)', 
      partner: '@name', 
      sales: '@name', 
      pm: '@name', 
      "status|1-2":1, 
      "clicks|200-10000":3221, 
      "conversions|100-8000":3012, 
      cr:'@float(0, 0, 2, 2)', 
      epc:'@float(0, 0, 2, 2)', 
      "spend|10-10000.1-2":3012.12, 
      "earnings|10-10000.1-2":3012.12, 
      "profit|10-10000.1-2":3012.12, 
      roi:'@float(0, 0, 2, 2)', 
    }
  ],
  total:100,
  page:1,
  page_size:20
});

const countryList = mockjs.mock({
  code:0,
  'info|50':[
    { 
      'value|+1':1001,
      "label":'@county', 
    }
  ],
})

const companyList = mockjs.mock({
  code:0,
  'info|30':[
    {
      'value|+1':1001,
      "label":'@word(8, 12)', 
    }
  ]
})

export default {
  'GET /api/instances': instancesList,
  'GET /api/supplies': suppliesList,
  'GET /api/demands': demandsList,
  'GET /api/countryList':countryList,
  'POST /api/instances': (req, res) => {
    res.send({ code: 0 });
  },
  'PUT /api/instances/1001': (req, res) => {
    res.send({ code: 0 });
  },
  'POST /api/instances/changeStatus':(req, res) => {
    res.send({ code: 0 });
  },
  'PUT /supply/1001': (req, res) => {
    res.send({ code: 0 });
  },
  'POST /supply':(req, res) => {
    res.send({ code: 0 });
  },
  'GET /api/search':companyList
};