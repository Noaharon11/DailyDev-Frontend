// import ReactDOM from "react-dom";
// import CommentsModal from "./CommentsModal";
// import { IPost } from "../types";

// interface CommentsModalPortalProps {
//   post: IPost;
//   onClose: () => void;
// }

// const CommentsModalPortal: React.FC<CommentsModalPortalProps> = ({
//   post,
//   onClose,
// }) => {
//   const modalRoot = document.getElementById("modal-root");
//   if (!modalRoot) return null;

//   return ReactDOM.createPortal(
//     <CommentsModal post={post} onClose={onClose} />,
//     modalRoot
//   );
// };

// export default CommentsModalPortal;

import ReactDOM from "react-dom";
import CommentsModal from "./CommentsModal";
import { IPost } from "../types";

interface CommentsModalPortalProps {
  post: IPost;
  onClose: () => void;
}

const CommentsModalPortal: React.FC<CommentsModalPortalProps> = ({
  post,
  onClose,
}) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <CommentsModal post={post} onClose={onClose} />,
    modalRoot
  );
};
export default CommentsModalPortal;
