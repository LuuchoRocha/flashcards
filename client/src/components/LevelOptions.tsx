import { Level } from "../types/Level.ts"

const LevelOptions = ({ levels }: { levels: Level[] }) => {
  return <>
    <option value="">Select a level</option>
    {levels.map((level) => (
      <option value={level.id} key={level.id}>
        Level {level.level_number}
      </option>
    ))}
  </>
}

export default LevelOptions;
