import React, { Component } from "react";
import "./uDash.css"; // Import CSS for styling

class UserDashboard extends Component {
  state = {
    patientName: "",
    diseaseName: "",
    symptoms: "",
    duration: "",
    bplCardStatus: false,
    hospitalId: "",
    phoneNumber: "",
    email: "",
    assistantName: "",
    assistantPhone: "",
    assistantAddress: "",
    isSubmitted: false,
    submittedData: null, // New state to store submitted details
    diseases: ["Heart Attack", "Asthma", "Diabetes", "Stroke", "Cancer"], // predefined disease list
    hospitals: {
      "Heart Attack": ["Jayadeva Hospital", "Victoria Hospital", "Kempegowda Institute of Medical Sciences"],
      "Asthma": ["Rajiv Gandhi Institute of Chest Diseases", "Victoria Hospital", "Bowring and Lady Curzon Hospital"],
      "Diabetes": ["Vikram Hospital", "Bangalore Medical College and Research Institute", "Chigateri General Hospital"],
      "Stroke": ["Rajiv Gandhi Institute of Chest Diseases", "Victoria Hospital", "Vikram Hospital"],
      "Cancer": ["NIMHANS", "Bangalore Medical College and Research Institute", "Rajiv Gandhi Institute of Chest Diseases"],
    },
    availableHospitals: [], // Will store the hospitals filtered by disease
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      if (name === "diseaseName") {
        this.setState({
          availableHospitals: this.state.hospitals[value] || [],
          hospitalId: "", // Reset hospital selection
        });
      }
    });
  };

  handleCheckboxChange = (e) => {
    this.setState({ bplCardStatus: e.target.checked });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      patientName,
      diseaseName,
      symptoms,
      duration,
      bplCardStatus,
      hospitalId,
      phoneNumber,
      email,
      assistantName,
      assistantPhone,
      assistantAddress,
    } = this.state;

    try {
      const res = await fetch("http://localhost:9090/save_disease_details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName,
          pNumber: phoneNumber,
          diseaseName,
          symptoms,
          duration,
          bplCardStatus,
          hospitalId,
          email,
          assistantName,
          assistantPhone,
          assistantAddress,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Details saved successfully!");
        this.setState({
          isSubmitted: true,
          submittedData: {
            patientName,
            phoneNumber,
            hospitalId,
          },
        });
      } else {
        alert(data.error || "Failed to save details.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting details.");
    }
  };

  render() {
    const { isSubmitted, submittedData } = this.state;

    if (isSubmitted && submittedData) {
      return (
        <div className="confirmation-page">
          <h2>Submission Successful</h2>
          <p><strong>Patient Name:</strong> {submittedData.patientName}</p>
          <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
          <p><strong>Assigned Hospital:</strong> {submittedData.hospitalId}</p>
        </div>
      );
    }

    return (
      <div className="user-dashboard">
        <h2>Patient Disease Details</h2>
        <form onSubmit={this.handleSubmit} className="disease-form">
          <div className="form-group">
            <label htmlFor="patientName">Patient Name:</label>
            <input
              type="text"
              name="patientName"
              id="patientName"
              value={this.state.patientName}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="diseaseName">Disease Name:</label>
            <select
              name="diseaseName"
              id="diseaseName"
              value={this.state.diseaseName}
              onChange={this.handleChange}
              required
            >
              <option value="">Select a Disease</option>
              {this.state.diseases.map((disease, index) => (
                <option key={index} value={disease}>
                  {disease}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="hospitalId">Assigned Hospital:</label>
            <select
              name="hospitalId"
              id="hospitalId"
              value={this.state.hospitalId}
              onChange={this.handleChange}
              required
            >
              <option value="">Select a Hospital</option>
              {this.state.availableHospitals.map((hospital, index) => (
                <option key={index} value={hospital}>
                  {hospital}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration of Disease (in weeks):</label>
            <input
              type="number"
              name="duration"
              id="duration"
              value={this.state.duration}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bplCardStatus">Do you have a BPL Card?</label>
            <input
              type="checkbox"
              name="bplCardStatus"
              id="bplCardStatus"
              checked={this.state.bplCardStatus}
              onChange={this.handleCheckboxChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="symptoms">Symptoms:</label>
            <textarea
              name="symptoms"
              id="symptoms"
              value={this.state.symptoms}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={this.state.phoneNumber}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>

          <h3>Patient Assistant Details</h3>
          <div className="form-group">
            <label htmlFor="assistantName">Assistant's Name:</label>
            <input
              type="text"
              name="assistantName"
              id="assistantName"
              value={this.state.assistantName}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="assistantPhone">Assistant's Phone Number:</label>
            <input
              type="text"
              name="assistantPhone"
              id="assistantPhone"
              value={this.state.assistantPhone}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="assistantAddress">Assistant's Address:</label>
            <textarea
              name="assistantAddress"
              id="assistantAddress"
              value={this.state.assistantAddress}
              onChange={this.handleChange}
              required
            />
          </div>

          <button type="submit">Submit Details</button>
        </form>
      </div>
    );
  }
}

export default UserDashboard;
