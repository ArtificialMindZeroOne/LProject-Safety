interface ICard {
  _id: string;
  link: string;
  name: string;
  likes: {
    _id: string;
  }[];
  owner: {
    _id: string;
  };
}

export default ICard;
