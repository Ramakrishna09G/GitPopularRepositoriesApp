// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageFiltersData, updateActiveLanguageId} = props

  const onChangeActiveId = event => {
    updateActiveLanguageId(event.target.value)
  }

  return (
    <div className="language-filter-items-container">
      {languageFiltersData.map(eachLanguageOption => (
        <button
          type="button"
          key={eachLanguageOption.id}
          value={eachLanguageOption.id}
          onClick={onChangeActiveId}
          className="each-option"
        >
          {eachLanguageOption.language}
        </button>
      ))}
    </div>
  )
}
export default LanguageFilterItem
