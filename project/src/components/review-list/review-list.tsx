import {FC} from 'react';
import {default as dayjs} from 'dayjs';

import {getRatingWidth} from 'components/app/const';
import {Reviews} from 'types/reviews';

export type ReviewListProps = {
  reviews: Reviews[];
}

export const ReviewList: FC<ReviewListProps> = ({reviews}) => (
  <>
    {reviews.map((review) => (
      <ul className="reviews__list" key={review.id}>
        <li className="reviews__item">
          <div className="reviews__user user">
            <div className="reviews__avatar-wrapper user__avatar-wrapper">
              <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54"
                height="54"
                alt="Reviews avatar"
              />
            </div>
            <span className="reviews__user-name">
              {review.user.name}
            </span>
          </div>
          <div className="reviews__info">
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <span style={{width: `${getRatingWidth(review.rating)}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <p className="reviews__text">
              {review.comment}
            </p>
            <time className="reviews__time" dateTime={review.date}>
              {dayjs(review.date).format('MMMM D, YYYY')}
            </time>
          </div>
        </li>
      </ul>
    ))}
  </>
);

export default ReviewList;
