import React, { Component } from "react";
import Checkbox from "./Checkbox";
import Footer from "./footer"
import Precaution from "./precautions"
import {Link} from "react-scroll"
import Header from "./Header"

const OPTIONS = ["itching","skin_rash", "nodal_skin_eruptions","continuous_sneezing", "shivering", "chills",	"joint_pain",	"stomach_pain",	"acidity",	"ulcers_on_tongue",	"muscle_wasting",	"vomiting",	"burning_micturition",	"spotting_ urination",	"fatigue",	"weight_gain",	"anxiety",	"cold_hands_and_feets",	"mood_swings",	"weight_loss",	"restlessness",	"lethargy",	"patches_in_throat",	"irregular_sugar_level",	"cough",	"high_fever",	"sunken_eyes",	"breathlessness",	"sweating",	"dehydration",	"indigestion",	"headache",	"yellowish_skin",	"dark_urine",	"nausea",	"loss_of_appetite",	"pain_behind_the_eyes",	"back_pain",	"constipation",	"abdominal_pain",	"diarrhoea",	"mild_fever",	"yellow_urine",	"yellowing_of_eyes",	"acute_liver_failure",	"fluid_overload",	"swelling_of_stomach",	"swelled_lymph_nodes",	"malaise",	"blurred_and_distorted_vision",	"phlegm",	"throat_irritation",	"redness_of_eyes",	"sinus_pressure",	"runny_nose",	"congestion",	"chest_pain",	"weakness_in_limbs",	"fast_heart_rate",	"painDuringBowel_movements",	"pain_in_anal_region",	"bloody_stool",	"irritation_in_anus",	"neck_pain",	"dizziness",	"cramps",	"bruising",	"obesity",	"swollen_legs",	"swollen_blood_vessels",	"puffy_face_and_eyes",	"enlarged_thyroid",	"brittle_nails",	"swollen_extremeties",	"excessive_hunger",	"extra_marital_contacts",	"drying_and_tingling_lips",	"slurred_speech",	"knee_pain",	"hip_joint_pain",	"muscle_weakness",	"stiff_neck",	"swelling_joints",	"movement_stiffness",	"spinning_movements",	"loss_of_balance",	"unsteadiness",	"weakness_of_one_body_side",	"loss_of_smell",	"bladder_discomfort",	"foul_smell_of urine",	"continuous_feel_of_urine",	"passage_of_gases", "internal_itching",	"toxic_look_(typhos)",	"depression",	"irritability",	"muscle_pain",	"altered_sensorium",	"red_spots_over_body",	"belly_pain",	"abnormal_menstruation",	"dischromic _patches",	"watering_from_eyes",	"increased_appetite",	"polyuria",	"family_history",	"mucoid_sputum",	"rusty_sputum",	"lack_of_concentration",	"visual_disturbances",	"receiving_blood_transfusion",	"receiving_unsterile_injections",	"coma",	"stomach_bleeding",	"distention_of_abdomen",	"historyOfAlcoholConsumption",	"Fluid_overload",	"blood_in_sputum",	"prominent_veins_on_calf",	"palpitations",	"painful_walking",	"pus_filled_pimples",	"blackheads",	"scurring",	"skin_peeling",	"silver_like_dusting",	"small_dents_in_nails",	"inflammatory_nails",	"blister",	"red_sore_around_nose",	"yellow_crust_ooze"]

class App extends Component {
  state = {
    checkboxes: OPTIONS.reduce(
      (options, option) => ({
        ...options,
        [option]: false
      }),
      {}
    ),
    disease: "",
    treatment: [],
    prevention: [],
    isLoaded: false
  };

  selectAllCheckboxes = isSelected => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {

      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected
        }
      }));
    });
  };

  deselectAll = () => this.selectAllCheckboxes(false);

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    const formData = this.state.checkboxes;
    fetch('http://127.0.0.1:5000/prediction/',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        console.log("Response Came")
        this.setState({
          disease: response.result,
          prevention: response.prevention,
          treatment: response.treatment,
          isLoaded: true
        });
      });
      document.getElementById('linkID').click();

    // Object.keys(this.state.checkboxes)
    //   .filter(checkbox => this.state.checkboxes[checkbox])
    //   .forEach(checkbox => {
    //     console.log(checkbox, "is selected.");
    //   });
  };

  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  createCheckboxes = () => OPTIONS.map(this.createCheckbox);



  render() {
    return (

      <div className="Container">
      <Header/>
        <div className="row mt-5">
          <div className="col-sm-12 content">
          <h1 className="header" id="delete">Tell us your Symptoms , We will tell your Health Status</h1>
            <form onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}

              <div className="form-group mt-2">
                <button size="lg" type="button" className="btn btn-outline-primary mr-2 btnDiv" onClick={this.deselectAll}
                >
                  Deselect All
                </button>
                <button size="lg" type="submit" className="btn btn-primary btnDiv ">
                    Predict
                </button>
                 <Link id="linkID" activeClass="active"  to="resultID" spy={true} smooth={true}></Link>
              </div>
            </form>
          </div>
        </div>
        <div id="resultID" className="test">
        {this.state.disease === "" ? null :
        (<div>
          <div className="result-container">
            <h5 className="header diseaseHeader">Sorry to say, but you may be suffering from {this.state.disease}</h5>
            <Precaution className="" title="Precautions" list={this.state.prevention} />
            <Precaution className="" title="Treatment" list={this.state.treatment} />
            <h4 style={{color: "grey", marginBottom: "50px"}}>You are advised to kindly consult a Doctor, before taking any serious measures.</h4>
          </div>
        </div>)
      }
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
