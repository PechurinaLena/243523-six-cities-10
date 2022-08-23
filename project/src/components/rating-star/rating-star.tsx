import {FC} from 'react';

export type RatingStarProps = {
  ratingTitle: string;
  rating: number;
  handleChange: (star: number) => void;
  isChecked: boolean;
}

export const RatingStar: FC<RatingStarProps> = ({ratingTitle, rating, handleChange, isChecked}) => (
  <>
    <input className="form__rating-input visually-hidden" name="rating" value={rating}
      id={`${rating}-stars`}
      type="radio" checked={isChecked}
      onChange={() => handleChange(rating)}
    />
    <label htmlFor={`${rating}-stars`} className="reviews__rating-label form__rating-label" title={ratingTitle}>
      <svg className="form__star-image" width="37" height="33">
        <use xlinkHref="#icon-star"></use>
      </svg>
    </label>
  </>
);

export default RatingStar;
