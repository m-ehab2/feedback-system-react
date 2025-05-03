import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

type RatingSelectProps = {
  id?: string;
  name: string;
  value: number;
  onChange: (name: string, value: number) => void;
  onBlur: () => void;
};

const RatingSelect: React.FC<RatingSelectProps> = ({
  id,
  name,
  value,
  onChange,
  onBlur,
}) => {
  const handleClick = (selected: number) => {
    onChange(name, selected);
  };

  return (
    <div
      id={id}
      className="rating-stars"
      onBlur={onBlur}
      tabIndex={0}
      role="radiogroup"
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = +value >= star;
        return (
          <span
            key={star}
            className="star"
            onClick={() => handleClick(star)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleClick(star);
            }}
            role="radio"
            aria-checked={isFilled}
            tabIndex={0}
          >
            {isFilled ? (
              <AiFillStar size={24} color="#fbbf24" />
            ) : (
              <AiOutlineStar size={24} color="#9ca3af" />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default RatingSelect;
