import config from "./config";

export default class Data {

    // api method used to make GET and POST requests to the REST API

    api(path, method = "GET", body = null, requiresAuth = false, credentials = null) {

        // const url is the based defined URL from config
        
        const url = config.apiBaseUrl + path;

        // The options object sends a request with the HTTP method (GET, PUT, POST, DELETE),
        // as well as the request headers

        const options = {
            method,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          };

          // If the body returned from the request has data it is then stringifyed

          if (body !== null) {
            options.body = JSON.stringify(body);
          }

          // Using bota to encode the emailAddress and password of the authenticated user

          if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

            // Adding a new property to options.headers

            options.headers["Authorization"] = `Basic ${encodedCredentials}`;
          }

        return fetch(url, options);
    }

    // Sever request. Get user. async function takes the credentials as arguments 

    async getUser(emailAddress, password) {
        const response = await this.api(`/users`, "GET", null, true, { emailAddress, password });
        if (response.status === 200) {
          return response.json().then(data => data);
        }
        else if (response.status === 401) {
          return null;
        }
        else {
          throw new Error();
        }
      }

      async updateCourse(id, course, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, "PUT", course, true, { emailAddress, password } );
        if (response.status === 204) {
          return response;
        }
        else if (response.status === 400) {
          return response.json().then(data => {
            return data.errors;
          });
        }
      }

      async createUser(user) {
        const response = await this.api("/users", "POST", user);
        if (response.status === 201) {
          return [];
        }
        else if (response.status === 400) {
          return response.json().then(data => {
            return data.errors;
          });
        }
      }

      async createCourse(newCourse, emailAddress, password,) {
        const response = await this.api("/courses", "POST", newCourse, true, { emailAddress, password} );
        if (response.status === 201) {
          return [];
        }
        else if (response.status === 400) {
          return response.json().then(data => {
            return data.errors;
          });
        } else {
          throw new Error();
        }
      }
    
    

      async getCourses() {
        const response = await this.api("/courses", "GET", null, false);
        if (response.status === 200) {
          return response.json().then(data => data);
        }
        else if (response.status === 401) {
          return response.json().then(data => {
            return data.errors;
          });
        }
        else {
          throw new Error();
        }
      }

      async getCoursesById(id) {
        const response = await this.api(`/courses/${id}`, "GET", null, false);
        if (response.status === 200) {
          return response.json().then(data => data);
        }
        else if (response.status === 401) {
          return null;
        }
        else {
          throw new Error();
        }
      }

      async deleteCourse(id, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, "DELETE", null, true, { emailAddress, password });
        if (response) {
          return response;
        }
        else if (response.status === 401) {
          return null;
        }
        else {
          throw new Error();
        }
      }
}