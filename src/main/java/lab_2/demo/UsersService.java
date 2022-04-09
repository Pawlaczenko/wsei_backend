package lab_2.demo;

import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UsersService {

    private ConcurrentHashMap<Integer,Object> users = new ConcurrentHashMap<>();

    @PostConstruct
    private void onConstruct() {
        this.users.put(1, new Object()); //user1
        this.users.put(2, new Object()); //user2
        this.users.put(3, new Object()); //user3
    }

    public UsersPage getUsers(int pageNumber, int pageSize){
        pageNumber = Math.max(1,pageNumber);
        pageSize = Math.max(1,pageSize);
        pageSize = Math.min(100,pageSize);

        int pagesCount = 0; //TODO: wyliczyc
        int totalCount = 0; //TODO: pibrac

        return new UsersPage(pageNumber,pagesCount,pageSize,totalCount, this.users.values());
    }



}
