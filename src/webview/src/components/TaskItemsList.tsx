import { TaskItem } from "./TaskItem"
import { styled } from "goober"

const DUMMY_ITEMS = [
  {
    id: 1,
    name: "First Task",
    goalTime: 600000, // 10 min
    timeConsumed: 300000, // 5 min
    status: 'in_progress'
  },
  {
    id: 2,
    name: "Second Task",
    goalTime: 600000, // 10 min
    timeConsumed: 300000, // 5 min
    status: 'completed'
  },
]

const Container = styled('div')`
    display: flex;
    gap: 16px;
    flex-direction: column;
`

export const TaskItemsList = () => {
    return <Container>
        {DUMMY_ITEMS. map((data) =>

          <TaskItem {...data as any} />
        )}
      </Container>
}