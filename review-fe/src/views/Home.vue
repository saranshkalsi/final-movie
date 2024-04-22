<template>
  <div class="container-fluid mb-5">
    <div class="row d-flex justify-content-center mt-5">
      <div class="col-10">
        <div class="d-flex justify-content-center mb-4">
          <form class="form-inline" @submit.prevent="searchMovie">
            <div class="input-group">
              <input
                class="form-control"
                type="search"
                v-model="searchQuery"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                class="btn btn-primary"
                type="submit"
                :disabled="searchQuery.trim().length === 0"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div v-if="isLoading">
          <div class="d-flex justify-content-center">
            <p>Loading...</p>
          </div>
        </div>
        <div v-else-if="movies.length > 0">
          <table class="table table-bordered table-centered">
            <thead>
              <tr>
                <th scope="col">Movie Poster</th>
                <th scope="col">Movie Title</th>
                <th scope="col">Language</th>
                <th scope="col">Release Date</th>
                <th scope="col">Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(movie, index) in paginatedMovies" :key="index">
                <router-link
                  :to="`/movie/${movie.id}`"
                  style="text-decoration: none"
                >
                  <td class="text-center">
                    <template
                      v-if="
                        movie.attributes.thumbnail.data.attributes.formats
                          .thumbnail.url &&
                        movie.attributes.thumbnail.data.attributes.formats.thumbnail.url.endsWith(
                          'null',
                        )
                      "
                    >
                      Poster Not Available
                    </template>
                    <template v-else class="inline-block">
                      <img
                        :src="`${movie.attributes.thumbnail.data.attributes.formats.thumbnail.url}`"
                        alt="Movie Poster"
                        class=""
                        style="max-height: 100px"
                      />
                    </template>
                  </td>
                </router-link>
                <td class="text-center">{{ movie.attributes?.title }}</td>
                <td class="text-center">
                  {{
                    movie.attributes?.language
                      ? movie.attributes?.language
                      : "N.A"
                  }}
                </td>
                <td class="text-center">
                  {{
                    movie.attributes?.release_date
                      ? movie.attributes?.release_date
                      : "N.A"
                  }}
                </td>
                <td class="text-center">
                  {{ movie.attributes.rating.toFixed(1) }}/10
                </td>
              </tr>
            </tbody>
          </table>

          <div class="pagination">
            <button
              class="btn btn-info"
              @click="previousPage"
              :disabled="currentPage === 1"
            >
              Previous
            </button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button
              class="btn btn-info"
              @click="nextPage"
              :disabled="currentPage === totalPages"
            >
              Next
            </button>
          </div>
        </div>
        <div v-else>
          <div class="d-flex justify-content-center">
            <p>No content found.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { customFetch, strapiUrl } from "@/lib/utils";
export default {
  data() {
    return {
      movies: [],
      searchQuery: "",
      currentPage: 1,
      reviewsPerPage: 10,
      isLoading: true,
      strapiUrl: strapiUrl,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.movies.length / this.reviewsPerPage);
    },
    paginatedMovies() {
      const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
      const endIndex = startIndex + this.reviewsPerPage;
      return this.movies.slice(startIndex, endIndex);
    },
  },
  mounted() {
    customFetch
      .get("/api/movie-reviews?populate=*")
      .then((response) => {
        this.movies = response.data?.data;
        this.isLoading = false;
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        this.isLoading = false;
      });
  },
  methods: {
    async searchMovie() {
      try {
        this.isLoading = true;
        const response = await customFetch.get(
          `/api/movie-reviews?populate=*&filters[title][$contains]=${encodeURIComponent(
            this.searchQuery,
          )}`,
        );
        this.movies = response.data?.data;
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching data: ", error);
        this.isLoading = false;
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    viewMovieDetails(movie) {
      this.$router.push({
        name: "MovieDetail",
        params: { id: movie.id, movie: movie },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;

  th,
  td {
    padding: 0.5rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }
}

.table-centered {
  th,
  td,
  tbody {
    text-align: center;
    vertical-align: middle;
  }
}

.inline-block {
  display: inline-block;
}
.pagination {
  margin-top: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    margin: 0 0.375rem;
  }
}
</style>
