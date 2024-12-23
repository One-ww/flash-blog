import { useRequest, useSafeState } from 'ahooks'
import React from 'react'

import Layout from '@/components/Layout'
import MyPagination from '@/components/MyPagination'
import { DB } from '@/utils/apis/dbConfig'
import { getWhereOrderPageSum } from '@/utils/apis/getWhereOrderPageSum'
import { _ } from '@/utils/cloudBase'
import { detailPostSize, staleTime } from '@/utils/constant'

import { Title } from '../titleConfig'
import ArtList from './ArtList'
import Search from './Search'

const Articles: React.FC = () => {
  const [page, setPage] = useSafeState(1)

  const [where, setWhere] = useSafeState(() => ({}))

  // const { data, loading, run } = useRequest(
  //   () =>
  //     getWhereOrderPageSum({
  //       dbName: DB.Article,
  //       where: { ...where, post: _.eq(true) },
  //       page,
  //       size: detailPostSize,
  //       sortKey: 'date'
  //     }),
  //   {
  //     retryCount: 3,
  //     refreshDeps: [page],
  //     cacheKey: `Articles-${DB.Article}-${JSON.stringify(where)}-${page}`,
  //     staleTime
  //   }
  // )

  const { data, loading, run } = useRequest(
    async () => [
      await import(`@/data/homeData/article-data/data-${page}.json`),
      await import(`@/data/homeData/article-statistics/article-total.json`)
    ],

    {
      retryCount: 3,
      refreshDeps: [page],
      cacheKey: `Articles-article-${JSON.stringify(where)}-${page}`,
      staleTime
    }
  )

  return (
    <Layout title={Title.Articles}>
      <Search page={page} setPage={setPage} where={where} setWhere={setWhere} run={run} />
      <ArtList articles={data?.[0].data} loading={loading} page={page} />
      <MyPagination
        current={page}
        defaultPageSize={detailPostSize}
        total={data?.[1].data.total}
        setPage={setPage}
        autoScroll={true}
        scrollToTop={440}
      />
    </Layout>
  )
}

export default Articles
