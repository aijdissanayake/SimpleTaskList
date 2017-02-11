import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService{
    constructor(private http:Http){
        console.log('Task Service Intialized...');
    }

    getTasks(){
        var tasks = this.http.get('http://localhost:3000/api/tasks')
            .map(res =>res.json());
        return tasks;
    }

    addTask(newTask){
        var headers = new Headers();
        headers.append('content-type','application/json');
        return this.http.post('http://localhost:3000/api/task',JSON.stringify(newTask),{headers:headers})
            .map(res => res.json());
    }

    deleteTask(id){
        return this.http.delete('/api/task/'+id)
            .map(res => res.json());
    }

    updateStatus(task){
        var headers = new Headers();
        headers.append('content-type','application/json');
        return this.http.put('/api/task/'+task._id,JSON.stringify(task),{headers:headers})
            .map(res => res.json());
    }
}
 