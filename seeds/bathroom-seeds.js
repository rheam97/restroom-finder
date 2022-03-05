const { Bathroom } = require('../models');

const postdata = [
  {
    title: '',
    gendered: false,
    lat: 38.90906402785339,
    lon: -77.00694631494005,
    unisex: true,
    disabled_access: true,
    changing_tables: true,
    key: true,
    menstruation_products: true,
    user_id: 8
  },
  {
    title: '',
    gendered: true,
    lat: 38.90296640112294,
    lon: -77.06304015806603,
    unisex: false,
    disabled_access: true,
    changing_tables: true,
    key: true,
    menstruation_products: true,
    user_id: 6
  },
  {
    title: '',
    gendered: false,
    lat:  38.905979949284784,
    lon: -77.02243769774073,
    unisex: true,
    disabled_access: true,
    changing_tables: true,
    key: true,
    menstruation_products: true,
    user_id: 5
  },
  {
    title: '',
    gendered: true,
    lat: 38.915118,
    lon: -77.056949,
    unisex: false,
    disabled_access: true,
    changing_tables: true,
    key: true,
    menstruation_products: true,
    user_id: 4
  },
  {
    title: '',
    gendered: true,
    lat: 38.90853679892686,
    lon: -77.0327643350491,
    unisex: true,
    disabled_access: true,
    changing_tables: true,
    key: true,
    menstruation_products: true,
    user_id: 2
  },
  {
    title: '',
    gendered: true,
    lat: 38.905569018430896,
    lon: -77.02906786828525,
    unisex: false,
    disabled_access: true,
    changing_tables: true,
    key: true,
    menstruation_products: true,
    user_id: 3
  },
  {
    title: '',
    gendered: false,
    lat: 38.90474714958805,
    lon: -77.03704754256903,
    unisex: true,
    disabled_access: true,
    changing_tables: true,
    key: true,
    menstruation_products: true,
    user_id: 1
  }
  
];

const seedPosts = () => Bathroom.bulkCreate(postdata);

module.exports = seedPosts;
