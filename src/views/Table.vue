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
                <td>{{ book.userObject["1"] }}</td>
                <td v-if="storageUserId == book.userObject['0']">
                  <i @click="remove(book.id)" class="far fa-trash-alt"></i>
                  &nbsp;
                  <i class="fas fa-edit"></i>
                  &nbsp;
                  <i class="fas fa-search"></i>
                </td>
                <td v-else><i class="fas fa-search"></i></td>
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
      storageUserId: localStorage.getItem("userId"),
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
        await this.axios.delete(`/books/${id}`, this.Bearer);
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
