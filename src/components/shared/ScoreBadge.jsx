function ScoreBadge({ score, label }) {
  let colorClass
  if (score >= 75) {
    colorClass = 'bg-green-100 text-green-700'
  } else if (score >= 50) {
    colorClass = 'bg-yellow-100 text-yellow-700'
  } else {
    colorClass = 'bg-red-100 text-red-700'
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${colorClass}`}>
      {label && <span className="font-normal">{label}</span>}
      {score}%
    </span>
  )
}

export default ScoreBadge
