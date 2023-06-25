// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachRepos} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = eachRepos

  return (
    <li className="repos-item-container">
      <img src={avatarUrl} alt={name} className="avatar-img" />
      <h1 className="avatar-name">{name}</h1>
      <div className="item-info-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="count-img"
        />
        <p className="item-info-name">{starsCount} stars</p>
      </div>
      <div className="item-info-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="count-img"
        />
        <p className="item-info-name">{forksCount} forks</p>
      </div>
      <div className="item-info-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="count-img"
        />
        <p className="item-info-name">{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
