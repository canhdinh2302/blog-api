module.exports = (votes, currentUser) => {
  if (!votes || !votes.length) return {}
  const currentUserVote = currentUser ? votes.find((v) => v.user === currentUser.id) : null

  return {
    points: votes.reduce((sum, vote) => sum + vote.point, 0),
    count: votes.length,
    currentUserPoints: currentUserVote ? currentUserVote.point : null,
  }
}
