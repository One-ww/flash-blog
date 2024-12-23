import { useKeyPress, useSafeState } from "ahooks";
import { message } from "antd";
import classNames from "classnames";
import React, { memo, useRef } from "react";

import { authLogin } from "@/utils/apis/authLogin";
import { myAvatar70, myEmail, myLink, myName } from "@/utils/constant";

import styles from "./index.scss";

interface Props {
  showAdmin?: boolean;
  setShowAdmin?: Function;
  setName?: Function;
  setEmail?: Function;
  setLink?: Function;
  setAvatar?: Function;
}

const AdminBox: React.FC<Props> = ({
  showAdmin = false,
  setShowAdmin,
  setName,
  setEmail,
  setLink,
  setAvatar,
}) => {
  const pwdRef = useRef(null);

  const [adminEmail, setAdminEmail] = useSafeState("");
  const [adminPwd, setAdminPwd] = useSafeState("");

  const hideAdmin = () => {
    setShowAdmin?.(false);
    setAdminEmail("");
    setAdminPwd("");
  };

  const adminLogin = async () => {
    if (await authLogin(adminEmail!, adminPwd!)) {
      message.success("登陆成功！");
      setName?.(myName);
      setEmail?.(myEmail);
      setLink?.(myLink);
      setAvatar?.(myAvatar70);
      hideAdmin();
    } else {
      message.error("登陆失败，请重试！");
    }
  };

  useKeyPress(13, adminLogin, {
    target: pwdRef,
  });

  return (
    <div
      className={classNames(styles.adminBox, { [styles.showAdmin]: showAdmin })}
    >
      <div className={styles.itemBox}>
        <div className={styles.adminKey}>邮箱</div>
        <input
          type="text"
          className={styles.adminValue}
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
        />
      </div>
      <div className={styles.itemBox}>
        <div className={styles.adminKey}>密码</div>
        <input
          ref={pwdRef}
          type="password"
          className={styles.adminValue}
          value={adminPwd}
          onChange={(e) => setAdminPwd(e.target.value)}
        />
      </div>
      <div className={classNames(styles.itemBox, styles.adminBtns)}>
        <div className={styles.adminBtn} onClick={hideAdmin}>
          取消
        </div>
        <div className={styles.adminBtn} onClick={adminLogin}>
          登录
        </div>
      </div>
    </div>
  );
};

export default memo(AdminBox);
