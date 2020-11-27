import React, { Component } from "react";
import Modal from "react-modal";
import { server } from "../../config";
import FetchErrorDialog from "../editor/FetchErrorDialog";
import Header from "../editor/Header";
import SignIn from "../editor/SignIn";
import axios from "axios";

Modal.setAppElement(document.body);

export default class NewProjectDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFetchError: false,
      fetchError: "",
      isModalOpen: false,
      projects: [],
    };

    this.closeFetchErrorDialog = this.closeFetchErrorDialog.bind(this);
  }

  createProject(projectName) {
    const data = { projectName: projectName };
    const url = `${server.apiUrl}/project`;
    const params = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    fetch(url, params)
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.err === "undefined") {
          window.location = `${server.serverUrl}/project/${data.project}`;
        } else {
          alert(`${data.err}\n\n${data.msg}`);
        }
      })
      .catch((error) => this.openFetchErrorDialog(error.message));
  }

  /**
   * Show Connection error dialog
   *
   * @param {String} msg
   */
  openFetchErrorDialog(msg) {
    this.setState({
      showFetchError: true,
      fetchError: msg,
    });
  }

  /**
   * Close Connection error dialog
   */
  closeFetchErrorDialog() {
    this.setState({
      showFetchError: false,
      fetchError: "",
    });
  }

  openModal() {
    axios.get("/api/projects", {}).then((res) => {
      this.setState({
        isModalOpen: true,
        projects: res.data,
      });
    });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    return (
      <div>
        {this.state.showFetchError && (
          <FetchErrorDialog
            msg={this.state.fetchError}
            onClose={this.closeFetchErrorDialog}
          />
        )}
        <Header />
        <Modal
          isOpen={true}
          contentLabel="new project"
          className={"modal"}
          overlayClassName={"null"}
        >
          <h2 className={"logo"}>
            <img src={"/icons/favicon.svg"} alt={"logo"} />
            RCV
          </h2>
          <div>
            <button
              id={"create-project-button"}
              onClick={() => this.openModal()}
            >
              시작하기
            </button>
            <SignIn
              isOpen={this.state.isModalOpen}
              close={() => this.closeModal()}
              create={(projectName) => this.createProject(projectName)}
              projects={this.state.projects}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
