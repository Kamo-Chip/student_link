import CustomSelect from "@/components/ui_elements/CustomSelect";
import opportunities from "@/public/data/opportunities.json";
import SearchPage from "@/components/app_elements/SearchPage";
const CandidateOpportunitiesPage = () => {
  return (
    <SearchPage
      placeholder={"Search event"}
      filters={
        <>
          <CustomSelect
            id="type"
            title="Type"
            options={["In-person", "Online"]}
            isSearch
            isSm
          />
          <CustomSelect
            id="type"
            title="Location"
            options={[
              "Gauteng",
              "Western Cape",
              "Eastern Cape",
              "Northern Cape",
            ]}
            isSearch
            isSm
          />
          <CustomSelect
            id="type"
            title="Industry"
            options={["Internship", "Graduate Programme", "Bursary", "Job"]}
            isSearch
            isSm
          />
        </>
      }
      elements={opportunities}
      type={"event"}
    />
  );
};

export default CandidateOpportunitiesPage;
