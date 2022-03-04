const { Bathroom } = require('../models');

const postdata = [
  {
    title: '',
    gendered: false,
    lat: 38.915189,
    lon: -77.056966,
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
    lat: 38.902134,
    lon: -77.06728,
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
    lat: 38.911134,
    lon: -77.05692,
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
    lat: 38.911134,
    lon: -77.05692,
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
    lat: 38.911134,
    lon: -77.05692,
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
    lat: 38.911134,
    lon: -77.05692,
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
    lat: 38.911134,
    lon: -77.05692,
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
