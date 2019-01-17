
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
      "conversions|100-8000":3012, 
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

export default {
  'GET /api/instances': instancesList
};