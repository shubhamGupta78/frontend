import { Rating } from "@material-ui/lab";
import React, {useEffect} from 'react'
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {

  useEffect(() => {
    // Update component state or perform actions when `count` prop changes
  }, [review]);
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

 

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comments}</span>
    </div>
  );
};

export default ReviewCard;
