import { useRequest } from 'ahooks';
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Card from '@/components/Card';
import { setArtSum } from '@/redux/actions';
import { DB } from '@/utils/apis/dbConfig';
import { staleTime } from '@/utils/constant';

import { fetchData } from './fetchData';
import styles from './index.scss';

interface Props {
  setArtSum?: Function;
}

const DataCard: React.FC<Props> = ({ setArtSum }) => {
  const navigate = useNavigate();
  const { data, loading } = useRequest(fetchData, {
    retryCount: 3,
    cacheKey: `DataCard-count-${DB.Article}-${DB.Class}-${DB.Tag}`,
    staleTime,
    onSuccess: data => setArtSum!(data?.articles.total)
  });

  return (
    <Card className={styles.card} loading={loading}>
      <div className={styles.blogData} onClick={() => navigate('/articles')}>
        <div className={styles.name}>文章</div>
        <div className={styles.num}>{data?.articles.total}</div>
      </div>
      <div className={styles.blogData} onClick={() => navigate('/classes')}>
        <div className={styles.name}>分类</div>
        <div className={styles.num}>{data?.classes.total}</div>
      </div>
      <div className={styles.blogData} onClick={() => navigate('/tags')}>
        <div className={styles.name}>标签</div>
        <div className={styles.num}>{data?.tags.total}</div>
      </div>
    </Card>
  );
};

export default connect(() => ({}), {
  setArtSum
})(DataCard);
