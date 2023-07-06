import { useDispatch, useSelector } from "react-redux";
import { editTodo, removeTodo, toggleTodo } from "redux/modules/todo";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Listcontainer = styled.div`
  padding-bottom: 50px;
  justify-content: center;
`;
const Listwrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  flex-direction: column;
  gap: 12px;
`;
const Todocontainer = styled.div`
  padding: 10px;
  width: 370px;
  height: 30px;
  border-bottom: 2px solid gray;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;

const H2 = styled.h2`
  display: flex;
  justify-content: center;
  font-size: 1.2em;
  margin-top: 50px;
  margin-bottom: 30px;
`;
const Todolist = styled.div`
  font-family: "GangwonEduSaeeum_OTFMediumA";
  font-size: 25px;
`;
const StyeldLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
const Bottonset = styled.div`
  display: flex;
  gap: 5px;
`;

const TodoDeleteBotton = styled.button`
  border: none;
  cursor: pointer;
  height: 30px;
  width: 50%;
  background-color: transparent;
  display: flex;
  font-size: 1.3em;
`;
const TodoCompeteBotton = styled(TodoDeleteBotton)``;
const TodoEditBotton = styled(TodoDeleteBotton)`
  font-size: 1.8em;
`;

function List({ isDone }) {
  //중앙 관리소에서 받아오기

  //useSelector 안에는 콜백함수가 들어가는데
  //state는 중앙 관리소의 state, todo는 리덕스 안에 있는 todo
  //이렇게 useSelector로 받아와 만든 todos를 아래에서 filter와 map을 돌림
  const todos = useSelector((state) => state.todo);

  const dispatch = useDispatch(); // dispatch 생성

  //수정 버튼 클릭
  const clickEditButtonHandler = (id) => {
    const text = prompt("수정할  텍스트를 입력해주세요");
    //액션객체를 Action creator로 변경
    dispatch(editTodo(id, text));
  };
  //완료 버튼 클릭
  const clickCompleteButtonHandler = (id) => {
    dispatch(toggleTodo(id));
  };
  //삭제 버튼 클릭
  const clickRemoveButtonHandler = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <Listcontainer>
      <H2>{isDone ? "DONELIST" : "TODOLIST"}</H2>
      <Listwrapper>
        {todos
          .filter(function (todo) {
            return todo.isDone === isDone;
          })
          .map(function (item) {
            return (
              <Todocontainer key={item.id}>
                <Todolist>
                  <StyeldLink to={`/detail/${item.id}`}>{item.text}</StyeldLink>
                </Todolist>

                <Bottonset>
                  <TodoEditBotton
                    onClick={() => clickEditButtonHandler(item.id)}
                  >
                    ✐
                  </TodoEditBotton>
                  <TodoCompeteBotton
                    onClick={() => clickCompleteButtonHandler(item.id)}
                  >
                    {isDone ? "X" : "☑️"}
                  </TodoCompeteBotton>

                  <TodoDeleteBotton
                    onClick={() => clickRemoveButtonHandler(item.id)}
                  >
                    🗑️
                  </TodoDeleteBotton>
                </Bottonset>
              </Todocontainer>
            );
          })}
      </Listwrapper>
    </Listcontainer>
  );
}

export default List;
