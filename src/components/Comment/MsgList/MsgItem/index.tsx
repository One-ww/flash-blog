import "dayjs/locale/zh-cn";

import { MessageOutlined } from "@ant-design/icons";
import { useBoolean } from "ahooks";
import classNames from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";

import MarkDown from "@/components/MarkDown";
import { myEmail, smallLoadingUrl } from "@/utils/constant";
import { useLazyImg } from "@/utils/hooks/useLazyImg";

import EditBox from "../../EditBox";
import styles from "./index.scss";

dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

interface Props {
  _id?: string;
  avatar?: string;
  link?: string;
  name?: string;
  date?: number;
  content?: string;
  email?: string;
  isReply?: boolean;
  replyRun?: Function;
  title?: string;
}

const MsgItem: React.FC<Props> = ({
  _id,
  avatar,
  link,
  name,
  date,
  content,
  email,
  isReply,
  replyRun,
  title,
}) => {
  const [showReply, { toggle: toggleReply, setFalse: closeReply }] =
    useBoolean(false);
  const { imgRef, imgUrl } = useLazyImg(avatar!, smallLoadingUrl);

  return (
    <div
      className={classNames(styles.commentItem, {
        [styles.marginLeft]: isReply,
      })}
    >
      <div className={styles.flex}>
        <div ref={imgRef} className={styles.avatarBox}>
          <img
            src={imgUrl}
            className={classNames({
              [styles.avatar]: imgUrl !== smallLoadingUrl,
              [styles.loading]: imgUrl === smallLoadingUrl,
            })}
          />
        </div>
        {!isReply && (
          <div className={styles.replyBtn} onClick={toggleReply}>
            <MessageOutlined />
          </div>
        )}

        <div className={styles.contentBox}>
          <div className={styles.usrInfo}>
            <a
              href={link}
              target={link ? "_blank" : "_self"}
              rel="noreferrer"
              className={styles.name}
              style={{ cursor: link ? "pointer" : "default" }}
            >
              {name}
            </a>
            {email === myEmail && <span className={styles.flag}>站长</span>}
            <span className={styles.date}>{dayjs(date).fromNow()}</span>
          </div>
          <MarkDown content={content || ""} className={styles.content} />
        </div>
      </div>

      <EditBox
        closeReply={closeReply}
        isReply={true}
        className={classNames(styles.replyBox, {
          [styles.replyHidden]: !showReply,
        })}
        replyName={name}
        replyId={_id}
        replyRun={replyRun}
        title={title}
        ownerEmail={email}
      />
    </div>
  );
};

export default MsgItem;
