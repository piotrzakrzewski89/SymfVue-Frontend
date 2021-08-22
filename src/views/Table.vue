<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h2>TABELKA:</h2>
      </div>
      <div class="col">
        <b-button v-b-modal.modal-1 variant="success"
          >Dodaj nową pozycję</b-button
        >
        <AddBook @add="add" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div key="1" v-if="loading" class="d-flex justify-content-center my-5">
          <b-spinner variant="primary" />
        </div>
        <div key="2" v-else>
          <pre></pre>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">id</th>
                <th scope="col">isbn</th>
                <th scope="col">tytul</th>
                <th scope="col">opis</th>
                <th scope="col">data dodania</th>
                <th scope="col">dodał</th>
                <th scope="col">opcje</th>
              </tr>
            </thead>
            <tbody>
              <tr :key="key" v-for="(book, key) in books">
                <th>{{ key }}</th>
                <td>{{ book.id }}</td>
                <td>{{ book.ISBN }}</td>
                <td>{{ book.title }}</td>
                <td>{{ book.description }}</td>
                <td>{{ book.publicationDate }}</td>
                <td>{{ book.user }}</td>
                <td v-if="loadingUser">
                  <b-spinner small variant="primary" type="grow" />
                </td>
                <td>
                  <i @click="remove(book.id)" class="far fa-trash-alt"></i>
                  &nbsp;
                  <i class="fas fa-edit"></i>
                  &nbsp;
                  <i class="fas fa-search"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddBook from "../components/AddBook.vue";

export default {
  components: {
    AddBook,
  },
  data() {
    return {
      loading: true,
      loadingUser: true,
      books: [],
      Bearer: {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      },
    };
  },
  methods: {
    async add(bookData) {
      console.log(bookData);
      try {
        await this.axios.post("/books", bookData, this.Bearer);

        let { data } = await this.axios.get("/books", this.Bearer);
        return (this.books = data["hydra:member"]);
        //console.log("Sukces ", response);
      } catch (e) {
        console.log("Error ", e);
      }
    },

    async remove(id) {
      try {
        if (id === undefined) {
          throw "Id nie istnieje !";
        }
        await this.axios.delete(`/books/${id}`);
        let { data } = await this.axios.get("/books", this.Bearer);
        return (this.books = data["hydra:member"]);
      } catch (e) {
        console.log("Error ", e);
      }
    },
  },
  async created() {
    try {
      let { data } = await this.axios.get("/books", this.Bearer);
      this.books = data["hydra:member"];
      this.loading = false;
      data["hydra:member"].forEach((book) => {
        if (book.user !== undefined) {
          // let endpoint = book.user.split("/");
          // endpoint = "/" + endpoint[4] + "/" + endpoint[5];
          //const userData = this.axios.get(endpoint, this.Bearer);
          //userData.then(function(result) {
          //  console.log(result.data);
          //});
          console.log(book.user);
        } else {
          console.log("Ups! undefined!");
        }
      });
      // console.log("Pobrałem dane ", data);
    } catch (e) {
      console.log("Error ", e);
    }
  },
};
</script>

<style>
.fa-trash-alt {
  color: red;
}
.fa-edit {
  color: blue;
}
.fa-search {
  color: green;
}
</style>
