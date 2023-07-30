import OpportunityCard from "@/components/app_elements/OpportunityCard";
import CustomSelect from "@/components/ui_elements/CustomSelect";
import searchPageStyles from "@/styles/pages/searchPage.module.css";
import utilityStyles from "@/styles/utils/utilities.module.css";
import opportunities from "@/public/data/opportunities.json";
const SearchPage = ({ placeholder, filters, elements, type }) => {
  return (
    <div className={searchPageStyles.container}>
      <div className={searchPageStyles.searchContainer}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input type="text" id="search" placeholder={placeholder} />
          <span className={utilityStyles.button}>Search</span>
        </div>
        <div className={searchPageStyles.filtersContainer}>{filters}</div>
        {elements.map((element, idx) => {
          return (
            <div key={`${element}${idx}`} style={{ marginTop: "1rem" }}>
              <OpportunityCard opportunity={element} type={type} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
