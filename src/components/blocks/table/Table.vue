<template>
  <div class="mat-table">
    <mat-toolbar
      size="small"
      :no-padding="true"
      color="primary-light"
      :shadow="false"
    >
      <slot name="title">
        <mat-padding>
          Table name
        </mat-padding>
      </slot>
      <mat-spacer />
      <mat-nav-link
        v-if="$slots.filter"
        @click="() => tableFiltersMenu = true">
        <mat-fa icon="filter" />
        <mat-menu
          position="bottom-right"
          v-model="tableFiltersMenu">
          <mat-toolbar size="xs" :shadow="false" color="accent">Filters</mat-toolbar>
          <mat-padding>
            <slot
              :filters="getFilters"
              :add-filter="addFilter"
              name="filter"></slot>
          </mat-padding>
        </mat-menu>
      </mat-nav-link>
      <mat-nav-link @click="() => tableColumnsMenu = true">
        <mat-fa icon="cog" />
        <mat-menu
          position="bottom-right"
          v-model="tableColumnsMenu">
          <mat-list>
            <div
              v-for="(column, key) in columns"
              :key="key"
              @click="setColumnVisibility(column.name, !visibleColumns[column.name])"
            >
              <mat-checkbox
                :value="visibleColumns[column.name]"
                @input="value => setColumnVisibility(column.name, value)">
                {{ column.header }}
              </mat-checkbox>
            </div>
          </mat-list>
        </mat-menu>
      </mat-nav-link>
    </mat-toolbar>
    <table class="mat-table">
      <thead>
        <tr>
          <template v-for="(column, key) in columns">
            <th
              v-if="!hiddenColumns.includes(column.name)"
              :key="key"
              @click="onClickColumnHeader(column.name)"
              :class="{ sorting: sortColumn === column.name }"
            >
              <mat-flex-layout>
                {{ column.header }}
                <mat-spacer />
                <mat-fa
                  v-if="sortColumn === column.name"
                  icon="arrow-down"
                  :rotate="sortDirection === 'desc' ? 0 : 180"
                />
              </mat-flex-layout>
            </th>
          </template>
        </tr>
      </thead>
      <tr
        v-for="(row, key) in sortedRows"
        :key="key"
      >
        <td
          v-for="(column, key) in visibleColumnNames"
          :key="key"
        >
          <slot
            :name="column"
            :value="row[column]">
              {{ row[column] }}
          </slot>
        </td>
      </tr>
      <tfoot>
        <tr>
          <td colspan="99">Footer</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import t from 'vue-types';

export default {
  name: 'Table',
  data: () => ({
    filters: {},
    hiddenColumns: [],
    tableColumnsMenu: false,
    tableFiltersMenu: false,
    sortColumn: null,
    sortDirection: '',
  }),
  props: {
    rows: t.array.def([]),
    columns: t.array.def([]),
  },
  computed: {
    getFilters() {
      return this.filters;
    },
    filteredRows() {
      const filters = Object.values(this.getFilters);
      const rows = [...this.rows];
      const r = filters.reduce((previousRows, currentFilter) => {
        if (currentFilter.filter) {
          return previousRows.filter(row => currentFilter.filter(row, currentFilter.value));
        }
        return previousRows;
      }, rows);
      return r;
    },
    sortedRows() {
      if (this.sortDirection && !this.sortColumn) {
        return this.filteredRows;
      }
      return [...this.filteredRows].sort((a, b) => {
        const { sortColumn, sortDirection } = this;
        if (a[sortColumn] === b[sortColumn]) {
          return 0;
        }
        const result = sortDirection === 'desc' ? 1 : -1;
        return a[sortColumn] > b[sortColumn] ? (-result) : result;
      });
    },
    visibleColumns() {
      return this.columns
        .reduce((prev, column) => ({
          ...prev, [column.name]: !this.hiddenColumns.includes(column.name),
        }), {});
    },
    visibleColumnNames() {
      return Object.keys(this.visibleColumns)
        .filter(columnName => this.visibleColumns[columnName]);
    },
  },
  methods: {
    addFilter(column, filter, value) {
      this.$set(this.filters, column, {
        filter,
        value,
      });
    },
    setColumnVisibility(columnName, value) {
      if (!value) {
        this.hiddenColumns.push(columnName);
      } else {
        this.hiddenColumns.splice(this.hiddenColumns.indexOf(columnName), 1);
      }
    },
    onClickColumnHeader(columnName) {
      if (this.sortColumn === columnName) {
        if (this.sortDirection === 'asc') {
          this.sortDirection = 'desc';
        } else {
          this.sortDirection = 'asc';
          this.sortColumn = '';
        }
      } else {
        this.sortDirection = 'asc';
        this.sortColumn = columnName;
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .mat-table {
    border-collapse: collapse;
    width: 100%;
    th {
      cursor: pointer;
      &.sorting {
        background: var(--accent);
      }
    }
    th, td {
      padding: 10px 15px;
      text-align: left;
      border-bottom: 1px solid var(--accent);
    }
    thead {
      border-bottom: 1px solid var(--accent);
    }
    tfoot {
      border-top: 1px solid var(--accent);
      td {
        text-align: right;
      }
    }
  }
</style>
