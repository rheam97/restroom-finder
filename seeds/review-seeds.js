const { Review } = require('../models');

const commentdata = [
  {
    review_rating: 3,
    review_text: 'Nunc rhoncus dui vel sem.',
    user_id: 1,
    bathroom_id: 1
  },
  { review_rating: 2,
    review_text: 'Nunc rhoncus dui vel sem.',
    user_id: 2,
    bathroom_id: 2
  },
  { review_rating: 4,
    review_text: 'Nunc rhoncus dui vel sem.',
    user_id: 3,
    bathroom_id: 3
  },
  {review_rating: 5,
    review_text: 'Nunc rhoncus dui vel sem.',
    user_id: 4,
    bathroom_id: 4
  },
  {review_rating: 4,
    review_text: 'Nunc rhoncus dui vel sem.',
    user_id: 5,
    bathroom_id: 5
  },
  {review_rating: 2,
    review_text: 'Nunc rhoncus dui vel sem.',
    user_id: 6,
    bathroom_id: 6
  },
  {review_rating: 3,
    review_text: 'Nunc rhoncus dui vel sem.',
    user_id: 7,
    bathroom_id: 7
  }
];

const seedComments = () => Review.bulkCreate(commentdata);

module.exports = seedComments;
