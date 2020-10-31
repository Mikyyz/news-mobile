<template>
  <div class="search-container">
    <!-- 搜索输入框 -->
    <form action="/">
      <van-search
        v-model.trim="searchText"
        background="#1989fa"
        show-action
        placeholder="请输入搜索关键词"
        :autofocus="true"
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :searchText="searchText" />
    <!-- 搜索联想词 -->
    <lenovo-word
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
    <!-- 历史记录 -->
    <search-history
      v-else
      :searchHistories="searchHistories"
      @search="onSearch"
    />
  </div>
</template>

<script>
import lenovoWord from "./components/lenovo-word";
import searchHistory from "./components/search-history";
import searchResult from "./components/search-result";
import { getSearchHistories } from "@/api/search";
import { mapState } from "vuex";
import store from "store";
export default {
  data() {
    return {
      searchText: "", //搜索文字
      isResultShow: false, //是否显示搜索结果
      searchHistories: [], //存放用户历史搜索记录
    };
  },
  components: {
    lenovoWord,
    searchHistory,
    searchResult,
  },
  async created() {
    this.loadSearchHistories();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    onSearch(searchText) {
      this.searchText = searchText;
      //用户触发搜索时将搜索词保存下来
      const index = this.searchHistories.indexOf(searchText);
      if (index !== -1) {
        //确保保存在本地的搜索词没有重复的
        this.searchHistories.splice(index, 1);
      }
      //将最新搜索的记录放在数组的最前面
      this.searchHistories.unshift(searchText);
      //存到本地
      store.set("search-history", this.searchHistories);

      this.isResultShow = true;
    },
    onCancel() {},
    //获取用户线上搜索历史记录
    async loadSearchHistories() {
      if (this.user) {
        const { data } = await getSearchHistories();
        this.searchHistories = data.data.keywords;
      } else {
        this.searchHistories = store.get("search-history");
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
</style>