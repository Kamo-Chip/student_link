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
      elements={[
        {
          title: "AdaptIT Hackathon",
          company: "AdaptIT",
          location: "Johannesburg",
          type: "In-person",
          link: "#",
        },
        {
          title: "TECHSPO",
          company: "TECHSPO",
          location: "Cape Town",
          type: "In-person",
          link: "https://techspocapetown.co.za",
        },
        {
          title: "THE ROCKING FUTURE ROADSHOW",
          company: "3RC",
          location: "Pietermaritzburg",
          type: "In-person",
          link: "know more",
        },
      ]}
      type={"event"}
    />
  );
};

export default CandidateOpportunitiesPage;
