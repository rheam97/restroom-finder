const { Bathroom } = require('../models');

const postdata = [
  {
    title: 'Bathroom 1',
    gendered: 'gendered',
    lat: 38.90906402785339,
    lon: -77.00694631494005,
    image_url: '',
    unisex: 'unisex',
    disabled_access: 'disabled',
    changing_tables: 'changingTables',
    key: 'key',
    menstruation_products: 'period',
    user_id: 8
  },
  {
    title: 'Bathroom 2',
    gendered: 'gendered',
    lat: 38.90296640112294,
    lon: -77.06304015806603,
    image_url: '',
    unisex: 'false',
    disabled_access: 'disabled',
    changing_tables: 'false',
    key: 'false',
    menstruation_products: 'false',
    user_id: 6
  },
  {
    title: 'Bathroom 3',
    gendered: 'false',
    lat:  38.905979949284784,
    lon: -77.02243769774073,
    image_url: '',
    unisex: 'unisex',
    disabled_access: 'disabled',
    changing_tables: 'changingTables',
    key: 'key',
    menstruation_products: 'false',
    user_id: 5
  },
  {
    title: 'Bathroom 4',
    gendered: 'gendered',
    lat: 38.915118,
    lon: -77.056949,
    image_url: '',
    unisex: 'false',
    disabled_access: 'false',
    changing_tables: 'false',
    key: 'false',
    menstruation_products: 'period',
    user_id: 4
  },
  {
    title: 'Bathroom 5',
    gendered: 'gendered',
    lat: 38.90853679892686,
    lon: -77.0327643350491,
    image_url: '',
    unisex: 'unisex',
    disabled_access: 'disabled',
    changing_tables: 'false',
    key: 'key',
    menstruation_products: 'false',
    user_id: 2
  },
  {
    title: 'Bathroom 6',
    gendered: 'gendered',
    lat: 38.905569018430896,
    lon: -77.02906786828525,
    image_url: '',
    unisex: 'false',
    disabled_access: 'false',
    changing_tables: 'changingTables',
    key: 'false',
    menstruation_products: 'false',
    user_id: 3
  },
  {
    title: 'Bathroom 7',
    gendered: 'false',
    lat: 38.90474714958805,
    lon: -77.03704754256903,
    image_url: '',
    unisex: 'unisex',
    disabled_access: 'disabled',
    changing_tables: 'false',
    key: 'key',
    menstruation_products: 'period',
    user_id: 1
  }
  
];

const seedPosts = () => Bathroom.bulkCreate(postdata);

module.exports = seedPosts;
