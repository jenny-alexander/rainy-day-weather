export interface ModalConfig {
	title: string
	positionX: ModalPositionX
	positionY: ModalPositionY
	padding: string
	showOverlay: boolean
}

export enum ModalPositionX {
	center = "center",
	right = "right",
	left = "left",
}

export enum ModalPositionY {
	center = "center",
	start = "start",
	end = "end",
}
