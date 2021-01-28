import React from 'react';
import axios from 'axios';

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.files[0].name
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    axios.get(`http://localhost:3000/cloud_storage/generate_signed_post_policy_v4?bucket=teste-ronaldo&file_name=${this.state.file}`)
      .then((response) => {
          const formData = new FormData(form)
          Object.keys(response.data.fields).forEach( (key) => {
            formData.append(key, response.data.fields[key])
          })

          axios.post(response.data.url, formData).then((response) => {
            console.log(response)
            console.log(response.data)
          })
      })
  }

  render() {
    return (
      <div>
        <form id="form-1" onSubmit={this.handleSubmit}>
          <input type="file" id="file" name="file" onChange={this.handleChange}/>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default UploadForm;
