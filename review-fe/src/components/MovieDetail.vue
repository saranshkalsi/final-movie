<template>
  <div class="container-fluid mb-5">
    <div class="row justify-content-center mt-5">
      <div class="col-md-10">
        <div v-if="movie">
          <div class="card">
            <h4 class="card-header fw-bold">{{ movie.attributes.title }}</h4>
            <div class="card-body">
              <div class="row">
                <div class="col-md-3">
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
                  <template v-else>
                    <img
                      :src="`${movie.attributes.thumbnail.data.attributes.formats.thumbnail.url}`"
                      alt="Movie Poster"
                      class="img-fluid"
                    />
                  </template>
                </div>
                <div class="col-md-9 my-3">
                  <p class="card-text">
                    <span class="fw-bold">Title: </span>
                    {{ movie.attributes.title }}
                  </p>
                  <p class="card-text">
                    <span class="fw-bold">Overview: </span>
                    {{ movie.attributes.overview }}
                  </p>
                  <p class="card-text">
                    <span class="fw-bold">Language: </span>
                    {{ movie.attributes.language }}
                  </p>
                  <p class="card-text">
                    <span class="fw-bold">Release Date: </span>
                    {{ movie.attributes.releaseDate }}
                  </p>
                  <p class="card-text">
                    <span class="fw-bold">Rating: </span>
                    {{ movie.attributes.rating.toFixed(1) }}/10
                  </p>
                  <p class="card-text">
                    <span class="fw-bold">Popularity: </span>
                    {{ movie.attributes.popularity }}
                  </p>
                  <p class="card-text">
                    <span class="fw-bold">Budget: </span>
                    {{ movie.attributes.budget }}
                  </p>
                  <p class="card-text">
                    <span class="fw-bold">Revenue: </span>
                    {{ movie.attributes.revenue }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="isReviewFetching" class="d-flex justify-content-center">
          <p>Loading...</p>
        </div>
        <div v-else>
          <p>No movie found with the given ID.</p>
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
      movie: null,
      isReviewFetching: true,
      strapiUrl: strapiUrl,
    };
  },
  mounted() {
    const movieId = this.$route.params.id;
    this.isReviewFetching = true;
    customFetch
      .get(`api/movie-reviews/${movieId}?populate=*`)
      .then((response) => {
        this.isReviewFetching = false;
        this.movie = response.data?.data;
      })
      .catch((error) => {
        this.isReviewFetching = false;
        console.error("Error fetching data: ", error);
      });
  },
};
</script>

<style scoped></style>
