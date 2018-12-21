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
      listLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getList({ page: 1 })
        .then(({ data }) => {
          console.log(data)
          this.list = data.list_data
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
