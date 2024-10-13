export default function isLastInBranch(comments, dateCreate, id) {
  let lastInBranch;

  let index = comments.findIndex(
    comment => comment.dateCreate === dateCreate && comment._id === id,
  );

  if (index !== -1) {
    for (let i = index; i < comments.length - 1; i++) {
      if (comments[i + 1]) {
        if (comments[i + 1].level <= comments[i].level) {
          lastInBranch = comments[i];
          break;
        }
        lastInBranch = comments[i];
      }
    }
  }

  if (lastInBranch) {
    return comments.findIndex(comment => comment === lastInBranch);
  }

  return index;
}
