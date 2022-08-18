import {ChangeEvent, FC, FormEvent, useState} from 'react';

import RatingStar from 'components/rating-star';
import {RatingStars} from 'mocks/reviews';
import {useAppDispatch} from 'hooks';
import {fetchNewReviewAction} from 'store/api-actions';
import {COMMENT_MIN_LENGTH} from 'components/app/const';

export type ReviewFormProps = {
  isReviewLoaded: boolean;
  hotelId: number;
}

export const ReviewForm: FC<ReviewFormProps> = ({isReviewLoaded, hotelId}) => {
  const [rating, setRating] = useState(0);
  const [comment, setReview] = useState('');
  const [isEnabledSubmit, setEnabledSubmit] = useState(false);

  const dispatch = useAppDispatch();

  const handleChange = ({target}: ChangeEvent<HTMLTextAreaElement>): void => {
    setReview(target.value);
    if (target.value.length >= COMMENT_MIN_LENGTH) {
      setEnabledSubmit(true);
    }
  };

  const onSubmit = () => {
    dispatch(fetchNewReviewAction({comment, rating, hotelId}));
    setEnabledSubmit(false);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setEnabledSubmit(true);
    onSubmit();
    setRating(0);
    setReview('');
  };


  return (
    <form className="reviews__form form" action="#" method='post' onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RatingStars.map((item) => (
          <RatingStar
            key={item.id}
            ratingTitle={item.title}
            rating={item.id}
            isChecked={rating === item.id}
            handleChange={(star: number) => setRating(star)}
            isReviewLoaded={isReviewLoaded}
          />
        )).reverse()}
      </div>
      <textarea className="reviews__textarea form__textarea" id="comment" name="comment" value={comment}
        placeholder="Tell how was your stay, what you like and what can be improved" onChange={handleChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit"
          disabled={!isEnabledSubmit}
        >Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
