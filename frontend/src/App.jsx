import { useState, useContext, useEffect } from "react";
import "./styles/App.css";
import PersonalDetails from "./components/personal/PersonalDetails";
import AddEducationSection from "./components/education/AddEducationSection";
import AddExperienceSection from "./components/experience/AddExperienceSection";
import Resume from "./components/Resume";
import TemplateLoader from "./components/TemplateLoader";
import exampleData, { generateUniqueId } from "./example-data";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function App() {
  const [personalInfo, setPersonalInfo] = useState(exampleData.personalInfo);
  const [sections, setSections] = useState(exampleData.sections);
  const [sectionOpen, setSectionOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState("content");
  const [resumeLayout, setResumeLayout] = useState("top");
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [prevState, setPrevState] = useState(null);
  // Creates a reference object that persists across renders
  // Doesn't cause re-renders when updated
  const resumeRef = useRef(null);

  function handlePersonalInfoChange(e) {
    const { key } = e.target.dataset;
    setPersonalInfo({ ...personalInfo, [key]: e.target.value });
  }

  function handleSectionChange(e) {
    const { key } = e.target.dataset;
    const inputValue = e.target.value;
    const form = e.target.closest(".section-form");
    const { id } = form;
    const { arrayName } = form.dataset;
    const section = sections[arrayName];
    setSections({
      ...sections,
      [arrayName]: section.map((obj) => {
        if (obj.id === id) obj[key] = inputValue;
        return obj;
      }),
    });
  }

  function createForm(arrayName, object) {
    setPrevState(null);
    const section = structuredClone(sections[arrayName]);
    section.push(object);
    setSections({ ...sections, [arrayName]: section });
  }

  const createEducationForm = () =>
    createForm("educations", {
      degree: "",
      schoolName: "",
      location: "",
      startDate: "",
      endDate: "",
      isCollapsed: false,
      isHidden: false,
      id: generateUniqueId(),
    });

  const createExperienceForm = () =>
    createForm("experiences", {
      companyName: "",
      positionTitle: "",
      location: "",
      description: "",
      startDate: "",
      endDate: "",
      isCollapsed: false,
      isHidden: false,
      id: generateUniqueId(),
    });

  const setOpen = (sectionName) => setSectionOpen(sectionName);
  function removeForm(e) {
    const form = e.target.closest(".section-form");
    const { arrayName } = form.dataset;
    const section = sections[arrayName];
    const { id } = form;

    setSections({
      ...sections,
      [arrayName]: section.filter((item) => item.id !== id),
    });
  }

  function cancelForm(e) {
    if (prevState == null) {
      removeForm(e);
      return;
    }

    const sectionForm = e.target.closest(".section-form");
    const { id } = sectionForm;
    const { arrayName } = sectionForm.dataset;
    const section = sections[arrayName];

    setSections({
      ...sections,
      [arrayName]: section.map((form) => {
        if (form.id === id) {
          form = prevState;
          form.isCollapsed = true;
        }

        return form;
      }),
    });
  }

  function toggleValue(e, key) {
    const sectionForm = e.target.closest(".section-form");
    const { id } = sectionForm;
    const { arrayName } = sectionForm.dataset;
    const section = sections[arrayName];
    setSections({
      ...sections,
      [arrayName]: section.map((form) => {
        if (form.id === id) {
          setPrevState(Object.assign({}, form));
          form[key] = !form[key];
        }

        return form;
      }),
    });
  }

  useEffect(() => {
    const verifyToken = async () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      try {
        if (!token) {
          throw new Error("No token found");
        }
        const response = await fetch(
          `http://127.0.0.1:8000/verify-token/${token}`
        );
        if (!response.ok) {
          throw new Error("Token not verified");
        }
      } catch (error) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        navigate("/");
      }
    };
    verifyToken();
  }, [navigate]);

  const toggleCollapsed = (e) => toggleValue(e, "isCollapsed");
  const toggleHidden = (e) => toggleValue(e, "isHidden");

  return (
    <>
      <div className="app">
        <div className="edit-side">
          <div className="form-container">
            <TemplateLoader
              onTemplateLoad={() => {
                setPersonalInfo(exampleData.personalInfo);
                setSections(exampleData.sections);
              }}
              onClear={() => {
                setPersonalInfo({
                  fullName: "",
                  email: "",
                  phoneNumber: "",
                  address: "",
                });
                setSections({ educations: [], experiences: [] });
                setPrevState(null);
              }}
            />
            {currentPage === "content" && (
              <>
                <PersonalDetails
                  onChange={handlePersonalInfoChange}
                  fullName={personalInfo.fullName}
                  email={personalInfo.email}
                  phoneNumber={personalInfo.phoneNumber}
                  address={personalInfo.address}
                />
                <AddEducationSection
                  educations={sections.educations}
                  isOpen={sectionOpen === "Education"}
                  onChange={handleSectionChange}
                  createForm={createEducationForm}
                  setOpen={setOpen}
                  onCancel={cancelForm}
                  toggleCollapsed={toggleCollapsed}
                  onHide={toggleHidden}
                  onRemove={removeForm}
                />
                <AddExperienceSection
                  experiences={sections.experiences}
                  isOpen={sectionOpen === "Experience"}
                  onChange={handleSectionChange}
                  createForm={createExperienceForm}
                  setOpen={setOpen}
                  onCancel={cancelForm}
                  toggleCollapsed={toggleCollapsed}
                  onHide={toggleHidden}
                  onRemove={removeForm}
                />
              </>
            )}
          </div>
        </div>

        {/* resumeRef holds reference to the Resume */}
        <Resume
          personalInfo={personalInfo}
          sections={sections}
          layout={resumeLayout}
          ref={resumeRef}
        />
        <Sidebar resumeRef={resumeRef} />
      </div>
    </>
  );
}
