import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem/index'
import RepositoryItem from '../RepositoryItem/index'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    popularReposList: [],
    isApiSuccess: false,
    isLoading: false,
  }

  componentDidMount() {
    this.getPopularRepositoriesList()
  }

  getPopularRepositoriesList = async () => {
    this.setState({isLoading: true})
    const {activeLanguageId} = this.state

    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const response = await fetch(url)

    if (response.ok === true) {
      const responseData = await response.json()
      const formattedData = responseData.popular_repos.map(eachRepos => ({
        id: eachRepos.id,
        name: eachRepos.name,
        issuesCount: eachRepos.issues_count,
        forksCount: eachRepos.forks_count,
        starsCount: eachRepos.stars_count,
        avatarUrl: eachRepos.avatar_url,
      }))
      this.setState({
        popularReposList: formattedData,
        isApiSuccess: true,
        isLoading: false,
      })
    } else if (response.status === 401) {
      this.setState({isApiSuccess: false})
    }
  }

  updateActiveLanguageId = activeId => {
    this.setState({activeLanguageId: activeId}, this.getPopularRepositoriesList)
  }

  renderSuccessView = () => {
    const {popularReposList} = this.state

    return (
      <ul className="popular-repos-list-container">
        {popularReposList.map(eachRepos => (
          <RepositoryItem key={eachRepos.id} eachRepos={eachRepos} />
        ))}
      </ul>
    )
  }

  renderFaliureView = () => (
    <div className="api-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="api-failure-view-img"
      />
      <p className="error-msg">Something Went Wrong</p>
    </div>
  )

  renderApiResultView = () => {
    const {isApiSuccess} = this.state

    return (
      <div className="api-view-container">
        {isApiSuccess ? this.renderSuccessView() : this.renderFaliureView()}
      </div>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const {activeLanguageId, isLoading} = this.state
    return (
      <div className="git-hub-popular-repos-bg-container">
        <div className="git-hub-popular-repos-container">
          <h1 className="app-title">Popular</h1>
          <LanguageFilterItem
            activeLanguageId={activeLanguageId}
            languageFiltersData={languageFiltersData}
            updateActiveLanguageId={this.updateActiveLanguageId}
          />
          {isLoading ? this.renderLoadingView() : this.renderApiResultView()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
