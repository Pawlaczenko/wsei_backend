package lab_2.demo;

import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UsersService {

    private ArrayList<UserEntity> users = new ArrayList<>();

    @PostConstruct
    private void onConstruct() {
        this.users.add(new UserEntity(1,"Bartek","bartek@email.com")); //user1
        this.users.add(new UserEntity(2,"Tomek","email@email.com")); //user2
        this.users.add(new UserEntity(3,"Jan","email@email.com")); //user3
    }

    public UsersPage getUsers(int pageNumber, int pageSize){
        pageNumber = Math.max(1,pageNumber);
        pageSize = Math.max(1,pageSize);
        pageSize = Math.min(100,pageSize);

        int pagesCount = 0; //TODO: wyliczyc
        int totalCount = 0; //TODO: pibrac

        return new UsersPage(pageNumber,pagesCount,pageSize,totalCount, this.users);
    }
}
