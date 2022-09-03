import {ChangeEvent, FC, FormEvent, useState} from 'react';

import RatingStar from 'components/rating-star';
import {fetchNewReviewAction, fetchReviewsAction} from 'store/api-actions';
import {useAppDispatch} from 'hooks';
import {COMMENT_TEXT_MAX_LENGTH, COMMENT_TEXT_MIN_LENGTH, RatingStars} from 'const';

export type ReviewFormProps = {
  hotelId: number;
}

export const ReviewForm: FC<ReviewFormProps> = ({hotelId}) => {
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [comment, setReview] = useState('');
  const [isEnabledSubmit, setEnabledSubmit] = useState(false);

  const dispatch = useAppDispatch();

  const handleTextAreaChange = ({target}: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(target.value);
  };

  const onSubmit = () => {
    dispatch(fetchNewReviewAction({comment, rating, hotelId}));
    dispatch(fetchReviewsAction({hotelId}));
    setEnabledSubmit(false);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setEnabledSubmit(true);
    if (comment !== null && rating !== null) {
      onSubmit();
      setReview('');
      setRating(undefined);
    }
  };

  return (
    <form className="reviews__form form" action="#" method='post' onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="comment">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RatingStars.map((item) => (
          <RatingStar
            key={item.id}
            ratingTitle={item.title}
            rating={item.id}
            isChecked={rating === item.id}
            handleChange={(star: number) => setRating(star)}
          />
        )).reverse()}
      </div>
      <textarea className="reviews__textarea form__textarea" id="comment" name="comment" value={comment}
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleTextAreaChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit"
          disabled={isEnabledSubmit || !rating || comment.length <= COMMENT_TEXT_MIN_LENGTH || comment.length > COMMENT_TEXT_MAX_LENGTH}
        >Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
