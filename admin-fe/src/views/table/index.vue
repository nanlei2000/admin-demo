<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit>
      <el-table-column label="Images" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.images" alt height="60">
        </template>
      </el-table-column>
      <el-table-column label="Title" align="center">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column label="Rating" prop="rating" align="center"></el-table-column>
      <el-table-column class-name="status-col" label="Genres" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-for="(item, index) in scope.row.genres" :key="index">{{ item }}</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-row style="margin-top:10px;float:right" v-if="total_count">
      <el-pagination
        layout="prev, pager, next"
        :page-count="+total_page"
        class="float-right"
        @current-change="fetchData"
        :total="+total_count"
        :page-size="10"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: false,
      total_count: 0,
      total_page: 0
    }
  },
  created() {
    this.fetchData(1)
  },
  methods: {
    fetchData(num) {
      this.listLoading = true
      getList({ page: num })
        .then(({ data }) => {
          this.list = data.list_data
          this.total_count = data.total_info.total_count
          this.total_page = data.total_info.total_page
          this.listLoading = false
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
