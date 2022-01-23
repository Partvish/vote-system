/**
 * An enum class created for the CandidatePickerRow element, to distinguish easly which button was pressed.
 * It's used in the candidate-picker-row.tsx, and in the the voting-page.tsx.
 */
enum CandidateMoveDirection {
    CandidateUp = 0,
    CandidateDown = 1,
    CandidateTop= 2,
    CandidateBottom = 3
}

export default CandidateMoveDirection;