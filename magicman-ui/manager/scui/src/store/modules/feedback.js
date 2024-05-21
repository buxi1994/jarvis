const defaultData = {
	id: "",
	status: "",
	title: "",
	description: "",
	creator: "",
	editor: "",
	comment: "",
};
export default {
	state: {
		data: { ...defaultData },
		mode:"add",
	},
	mutations: {
		editFeedback(state, data) {
			state.data.id = data.id;
			state.data.status = data.status;
			state.data.title = data.title;
			state.data.description = data.description;
			state.data.creator = data.creator;
			state.data.editor = data.editor;
			state.data.comment = data.comment;
		},
		editFeedbackMode(state,mode){
			state.mode = mode;
		},
		resetFeedback(state) {
			console.log('===='+JSON.stringify(defaultData));
			state.data=defaultData;
		},
	},
};
